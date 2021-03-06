import "./datatable.scss";
import {DataGrid} from "@mui/x-data-grid";
import {userColumns, userRows} from "../../datatablesource";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {db} from "../../firebase"
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";

const Datatable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                list.push({...doc.data(), id: doc.id});
            });
            setData(list);
            // console.log(list);
        }
        fetchData();
    }, [])


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter(item =>  item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{textDecoration: "none"}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;
