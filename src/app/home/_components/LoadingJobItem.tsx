import { Card, Avatar } from "antd";

const LoadingJobItem = () => {
  return (
    <div className="flex w-9/12  h-full  px-2 flex-col overflow-y-scroll">
      <Card
        className="w-full rounded-none"
        style={{ marginTop: 16, height: 200 }}
        loading={true}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>

      <Card
        className="w-full rounded-none"
        style={{ marginTop: 0, height: 200 }}
        loading={true}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
      <Card
        className="w-full rounded-none"
        style={{ marginTop: 0, height: 200 }}
        loading={true}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
      <Card
        className="w-full rounded-none"
        style={{ marginTop: 0, height: 200 }}
        loading={true}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
      <Card
        className="w-full rounded-none"
        style={{ marginTop: 0, height: 200 }}
        loading={true}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
    </div>
  );
};

export default LoadingJobItem;
