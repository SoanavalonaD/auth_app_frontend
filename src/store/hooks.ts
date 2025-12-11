import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';


export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;