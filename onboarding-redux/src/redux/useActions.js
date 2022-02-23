import { useMemo } from "react";
import { useDispatch } from "react-redux";
import * as actionCreators from "./actions";
import { bindActionCreators } from "redux";

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(
        () => bindActionCreators(actionCreators, dispatch),
        [dispatch]
    );
};
