import React, { createContext, useState } from "react";

export const UserContext = createContext<UserContextType | any>(undefined);

interface UserContextType {
	context: UserContextData;
	updateContext: (context: any) => void;
}

interface UserContextData {
	id: string;
	name: string;
	address: {};
	email: string;
	orders: [];
	cart: [];
	favorites: [];
}

export const UserProvider = ({ children }: any) => {
	const [context, setContext] = useState<UserContextData | {}>({});

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
