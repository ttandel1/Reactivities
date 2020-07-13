import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import ActivityDetailHeader from "../../activities/details/ActivityDetailHeader";
import ActivityDetailInfo from "../../activities/details/ActivityDetailInfo";
import ActivityDetailChat from "../../activities/details/ActivityDetailChat";
import ActivityDetailSidebar from "../../activities/details/ActivityDetailSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DeatilParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DeatilParams>> = ({
  match, history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id, history]);

  if (!activity) 
    return <h2>Activity Not Found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
