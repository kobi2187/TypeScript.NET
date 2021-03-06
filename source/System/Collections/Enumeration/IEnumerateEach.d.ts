﻿/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
import {PredicateWithIndex, ActionWithIndex} from "../../FunctionTypes";

export interface IEnumerateEach<T>
{
	// Note: Enforcing an interface that allows operating on a copy can prevent changing underlying data while enumerating.

	/**
	 * If the action returns false, the enumeration will stop.
	 * @param action
	 * @param useCopy
	 */
	forEach(action:ActionWithIndex<T>, useCopy?:boolean):number;
	forEach(action:PredicateWithIndex<T>, useCopy?:boolean):number;
}

export default IEnumerateEach;

