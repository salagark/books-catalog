/* eslint-disable import/no-anonymous-default-export */
import React, { createContext, ReactNode, Reducer, useContext, useMemo, useReducer } from "react";

export enum AsynchronousStateEnum {
	Pending = "Pending",
	Error = "Error",
	Success = "Success",
}

export interface PayloadAction<T = any, R = any> {
	payload: T;
	type: string;
	asynchronous?: AsynchronousStateEnum;
	error?: Error;
	result?: R;
}

export interface ReducerProviderProps<T> {
	children: ReactNode;
	defaultState?: T;
}

type ReducerSlice<T> = Record<string, (state: T, action: PayloadAction) => T>;

type ActionImplementation<R = any> = Record<string, (payload: any) => Promise<R> | R>;

export type ReducerProviderActions<T = any> = {
	[P in keyof ReducerSlice<T>]: (
		value: Parameters<ReducerSlice<T>[P]>[1]["payload"]
	) => Promise<Parameters<ReducerSlice<T>[P]>[1]["result"]>;
};

export interface ReducerProviderContextType<T> {
	actions: ReducerProviderActions<T>;
	state: T;
}

const createReducer = function <T>(
	reducerSlice: ReducerSlice<T>
): Reducer<T, PayloadAction & { type: string }> {
	return (prevState, action) => {
		return Object.keys(reducerSlice).reduce((state, actionType) => {
			const reducer = reducerSlice[actionType];

			if (action.type === actionType) return reducer(state, action);
			return state;
		}, prevState);
	};
};

export default function <T>(
	reducerSlice: ReducerSlice<T>,
	initialState: T,
	implementation?: ActionImplementation
) {
	const ReducerProviderContext = createContext<ReducerProviderContextType<T>>({
		actions: {},
		state: initialState,
	});
	const reducer = createReducer(reducerSlice);
	const ReducerProvider = ({ children, defaultState }: ReducerProviderProps<T>) => {
		const [state, dispatch] = useReducer(reducer, { ...initialState, ...defaultState });

		const actions = useMemo(
			() =>
				Object.keys(reducerSlice).reduce((acc, actionType) => {
					return {
						...acc,
						[actionType]: async (payload: PayloadAction["payload"]) => {
							let result = payload;

							// If specific implementation (middleware) is supported, it should be evaluated against
							// given payload and its result is an actual method result.
							// Otherwise result is the same as payload and reducer should update its state based
							// on that payload.
							if (implementation?.[actionType]) {
								try {
									result = implementation[actionType](payload);
								} catch (e) {
									console.error(e);

									dispatch({
										payload,
										type: actionType,
										error: e as Error,
									});

									// function invoker should be alerted that something went wrong and handle the exception
									throw e;
								}
							}

							if (result instanceof Promise) {
								dispatch({
									payload,
									type: actionType,
									asynchronous: AsynchronousStateEnum.Pending,
									result,
								});

								try {
									result = await result;
									dispatch({
										payload,
										type: actionType,
										asynchronous: AsynchronousStateEnum.Success,
										result,
									});
								} catch (e) {
									console.error(e);

									dispatch({
										payload,
										type: actionType,
										asynchronous: AsynchronousStateEnum.Error,
										error: e as Error,
									});

									// function invoker should be alerted that something went wrong and handle the exception
									throw e;
								}
							} else {
								dispatch({ payload, type: actionType, result });
							}

							return result;
						},
					};
				}, {}),
			[]
		);

		return (
			<ReducerProviderContext.Provider
				value={{
					actions,
					state,
				}}
			>
				{children}
			</ReducerProviderContext.Provider>
		);
	};

	const useReducerProvider = () => useContext(ReducerProviderContext);

	return { useReducerProvider, ReducerProvider };
}
