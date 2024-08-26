import { LocalStorageContext } from "@/provider/localStorage"
import { useContext } from "react"

export const useLocalStorage = () => {
	const context = useContext(LocalStorageContext)
	if (!context) {
		throw new Error(
			"useLocalStorage must be used within a LocalStorageProvider"
		)
	}
	return context
}
