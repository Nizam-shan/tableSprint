import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@mui/material";
interface SubCategoryColumnsProps {
  handleOpenDialog: (id: string) => void;
}

const SubCategoryColumns = ({
  handleOpenDialog,
}: SubCategoryColumnsProps): GridColDef[] => [
  {
    field: "id",
    headerName: "ID",

    minWidth: 50,
    flex: 1.5,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "subcategory_name",
    headerName: "Sub Category Name",
    minWidth: 230,
    flex: 1.5,
    align: "center",
    editable: false,
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "Category Name",
    minWidth: 180,
    flex: 1.5,
    align: "center",
    editable: false,
    headerAlign: "center",
  },
  {
    field: "subcategory_image",
    headerName: "Image",
    headerAlign: "center",
    editable: false,
    minWidth: 220,
    flex: 1.5,
    align: "center",
    renderCell: (params) => {
      return (
        <>
          <div style={{ padding: "5px" }}>
            <img
              src={`${process.env.REACT_APP_API}${params?.value}` || undefined}
              alt="Uploaded preview"
              style={{ maxWidth: "50%", height: "auto", margin: 2 }}
            />
          </div>
        </>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    description: "Status",
    headerAlign: "center",
    editable: false,
    minWidth: 150,
    flex: 1,
    align: "center",
    renderCell: (params) => {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5
              style={{
                color: params?.value === true ? "#00A11A" : "#F70505",
                fontSize: "15px",
                margin: 0,
              }}
            >
              {params?.value === true ? "Acive" : "Inactive"}
            </h5>
          </div>
        </>
      );
    },
  },
  {
    field: "subcategory_sequence",
    headerName: "Sequence",
    description: "Sequence.",
    minWidth: 150,
    flex: 1,
    align: "center",
    editable: false,
    headerAlign: "center",
  },
  {
    field: "",
    headerName: "Action",
    description: "Action.",
    sortable: false,
    minWidth: 120,
    flex: 1,
    align: "center",
    resizable: false,
    headerAlign: "center",
    renderCell: (params) => {
      console.log("🚀 ~ params:", params);
      const NavigateButton = () => {
        const navigate = useNavigate();
        const handleEditClick = () => {
          const formDataId = params.row._id;
          navigate(`/add_subcat?formdataId=${formDataId}&isEdit=true`);
        };
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button onClick={handleEditClick}>
                <FaRegEdit
                  style={{
                    width: "25px",
                    height: "auto",
                    color: "#8F8F8F",
                    cursor: "pointer",
                  }}
                />
              </Button>
              <Button onClick={() => handleOpenDialog(params?.row?._id)}>
                <RiDeleteBin6Line
                  style={{
                    width: "25px",
                    height: "auto",
                    color: "#8F8F8F",
                    cursor: "pointer",
                  }}
                />
              </Button>
            </div>
          </>
        );
      };
      return <NavigateButton />;
    },
  },
];

export default SubCategoryColumns;
