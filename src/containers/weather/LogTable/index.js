import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { LoadingContainer } from 'components/common';
import AppActions, { AppSelectors } from 'redux/AppRedux';

function LogTable({ logs, loading, loadLogs }) {
  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  return (
    <LoadingContainer loading={loading}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">City</TableCell>
              <TableCell component="th">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={2}>No Logs</TableCell>
              </TableRow>
            )}
            {logs.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.city}</TableCell>
                <TableCell>{moment(row.timestamp).format('LLLL')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </LoadingContainer>
  );
}

LogTable.propTypes = {
  loadLogs: PropTypes.func,
  loading: PropTypes.bool,
  logs: PropTypes.array
};

const mapStatesToProps = state => ({
  logs: AppSelectors.selectLogs(state),
  loading: AppSelectors.selectLogsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  loadLogs: () => dispatch(AppActions.loadLogs())
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(LogTable);
