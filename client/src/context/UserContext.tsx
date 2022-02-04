import React, { createContext, useState } from "react";

export const UserContext = createContext<UserContextType | any>(undefined);

interface UserContextType {
	context: UserContextData;
	updateContext: (context: any) => void;
}

interface UserContextData {
	name: string;
	age: number;
}

export const UserProvider = ({ children }: any) => {
	const [context, setContext] = useState({
		name: "Matilda",
		age: 31,
	} as UserContextData);

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
