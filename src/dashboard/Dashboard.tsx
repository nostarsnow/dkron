import * as React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { List, Datagrid, TextField } from 'react-admin';
import { fetchUtils } from 'ra-core';
import { TagsField } from '../TagsField';
import Leader from './Leader';
import FailedJobs from './FailedJobs';
import SuccessfulJobs from './SuccessfulJobs';
import UntriggeredJobs from './UntriggeredJobs';
import TotalJobs from './TotalJobs';

let fakeProps = {
  basePath: '/members',
  count: 10,
  hasCreate: false,
  hasEdit: false,
  hasList: true,
  hasShow: false,
  location: { pathname: '/', search: '', hash: '', state: undefined },
  match: { path: '/', url: '/', isExact: true, params: {} },
  options: {},
  permissions: null,
  resource: 'members',
};

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '0.5em' },
  rightCol: { flex: 1, marginLeft: '0.5em' },
  singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;

const Dashboard = () => {
  const [count, setCount] = React.useState<{
    leader: string;
    total_jobs: number;
    successful_jobs: number;
    failed_jobs: number;
    untriggered_jobs: number;
  }>({
    leader: 'devel',
    total_jobs: 0,
    successful_jobs: 0,
    failed_jobs: 0,
    untriggered_jobs: 0,
  });

  React.useEffect(() => {
    fetchUtils.fetchJson('/v1/count').then(({ headers, json }) => {
      setCount(json);
    });
  }, []);

  return (
    <div>
      <Card>
        <CardHeader title="Welcome" />
        <CardContent>
          <div style={styles.flex}>
            <div style={styles.leftCol}>
              <div style={styles.flex}>
                <Leader value={count.leader} />
                <Spacer />
                <TotalJobs value={String(count.total_jobs)} />
                <Spacer />
                <SuccessfulJobs value={String(count.successful_jobs)} />
                <Spacer />
                <FailedJobs value={String(count.failed_jobs)} />
                <Spacer />
                <UntriggeredJobs value={String(count.untriggered_jobs)} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Nodes" />
        <CardContent>
          <List {...fakeProps}>
            <Datagrid isRowSelectable={(record) => false}>
              <TextField source="Name" sortable={false} />
              <TextField source="Addr" sortable={false} />
              <TextField source="Port" sortable={false} />
              <TextField label="Status" source="statusText" sortable={false} />
              <TagsField source="Tags" sortable={false} />
            </Datagrid>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
