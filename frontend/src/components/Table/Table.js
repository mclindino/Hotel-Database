import React from 'react';
import MaterialTable from 'material-table';
import TableIcons from './TableIcons';
import AppContext from '../../pages/App/AppContext';
import styles from './styles';

export default function Table() {
  return (
    <div>
      <AppContext.Consumer>
        {({
          tableColumns, tableData, updateSelectedRows
        }) => (
          <MaterialTable
            title={false}
            style={styles.card}
            columns={tableColumns}
            data={tableData}
            icons={TableIcons}
            onSelectionChange={(event) => {
              updateSelectedRows(event);
            }}
            options={{
              exportButton: false,
              filtering: false,
              searchFieldStyle: styles.search,
              selection: true,
            }}
          />
        )}
      </AppContext.Consumer>
    </div>
  );
}
