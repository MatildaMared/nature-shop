import React, { createContext, useState } from "react";

export const UserContext = createContext<UserContextType | any>(undefined);

interface UserContextType {
	context: UserContextData;
	updateContext: (context: any) => void;
}

interface UserContextData {
	user: {
		id: string;
		name: string;
		address: {};
		email: string;
		orders: [];
		cart: [];
		favorites: [];
		role: string;
	};
	isLoggedIn: boolean;
	isAdmin: boolean;
	isLoading: boolean;
}

export const UserProvider = ({ children }: any) => {
	const [context, setContext] = useState<UserContextData | {}>({
		user: {},
		isLoggedIn: false,
		isAdmin: false,
		isLoading: true,
	});

	function updateContext(updates: Object) {
		setContext((prevState) => {
			return {
				...prevState,
				...updates,
			};
		});
	}

	const value = [context, updateContext];

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
