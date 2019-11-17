import React from 'react';
import MaterialTable from 'material-table';
import TableIcons from './TableIcons';
import AppContext from '../../AppContext';
import styles from './styles';

export default function Table() {
  return (
    <div>
      <AppContext.Consumer>
        {({
          tableColumns, tableData,
        }) => (
          <MaterialTable
            title={false}
            style={styles.card}
            columns={tableColumns}
            data={tableData}
            icons={TableIcons}
            options={{
              exportButton: false,
              filtering: false,
              searchFieldStyle: styles.search,
            }}
          />
        )}
      </AppContext.Consumer>
    </div>
  );
}
