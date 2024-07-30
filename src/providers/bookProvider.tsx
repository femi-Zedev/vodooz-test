"use client";
import { DisplayMode } from "@/interfaces/global.interface";
import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

interface Shelf {id: string, slug: string}
interface BookProviderProps {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	shelf: Shelf,
	setShelf: (value: Shelf) => void;
	displayMode: DisplayMode;
	setDisplayMode: (value: DisplayMode) => void;
}

const defaultBookProviderState: BookProviderProps = {
	searchQuery: '',
	setSearchQuery: () => {},
	shelf: { id: "", slug: ''},
	setShelf: () => {},
	displayMode: DisplayMode.Grid,
	setDisplayMode: () => {},
};

const BookProviderContext = createContext(defaultBookProviderState);

export const useBooks = () => useContext(BookProviderContext);

export default function BookProvider({ children }: PropsWithChildren) {
	const [searchQuery, setSearchQuery] = useState('');
	const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.Grid);
	const [shelf, setShelf] = useState<Shelf>({} as Shelf)

	const contextValue = useMemo<BookProviderProps>(() => {
		return {
			searchQuery,
			setSearchQuery: (value) => setSearchQuery(value),
			shelf,
			setShelf: (value) => setShelf(value),
			displayMode,
			setDisplayMode: (value) => setDisplayMode(value),
		};
	}, [searchQuery, displayMode]);

	return <BookProviderContext.Provider value={contextValue}>{children}</BookProviderContext.Provider>;
}
