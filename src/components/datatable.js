import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
const Table = props => {
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
      );
const columns = [
    {
      name: "Meter Category",
      selector: "MeterCategory",
      sortable: true,
      grow: 2
    },
    {
        name: "Cost",
        selector: "Cost",
        sortable: true,
        grow: 2
      },
      {
        name: "Date",
        selector: "Date",
        sortable: true,
        grow: 2
      },
      {
        name: "ConsumedQuantity",
        selector: "ConsumedQuantity",
        sortable: true,
        grow: 2
      },
      {
        name: "Location",
        selector: "Location",
        sortable: true,
        grow: 2
      },];
    const filteredItems = props.data.filter(
        item =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      );

      const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
          <FilterComponent
            onFilter={e => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        );
      }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
          title={props.title}
          columns={columns}
          data={filteredItems}
          defaultSortField="name"
          striped
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
      );
}
export default Table;