import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatuses } from "../../store/slices/statusesSlice";
import type { RootState } from "../../store/store";
import { getStatusesCall } from "../../api/helpdeskApi";


const statusesList = () => {
    const dispatch = useDispatch();
    const { allStatuses } = useSelector((state: RootState) => state.statuses);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const getStatuses = async () => {
            if (!token) return;
            const fetchedStatuses = await getStatusesCall(token);
            dispatch(setStatuses(fetchedStatuses));
        }
        getStatuses();
    }, [token, dispatch]);

    return (
        <>
            {allStatuses.map(status => (
                <div key={status.id}>{status.name}</div>
            ))}
        </>
    )
}

export default statusesList;