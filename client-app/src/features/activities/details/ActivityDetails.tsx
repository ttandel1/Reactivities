import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailHeader from "../../activities/details/ActivityDetailHeader";
import ActivityDetailInfo from "../../activities/details/ActivityDetailInfo";
import ActivityDetailChat from "../../activities/details/ActivityDetailChat";
import ActivityDetailSidebar from "../../activities/details/ActivityDetailSidebar";

interface DeatilParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DeatilParams>> = ({
  match,
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (!activity) return <LoadingComponent content="Loading Activity..." />;

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
