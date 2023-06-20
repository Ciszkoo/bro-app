interface ID {
  $oid: string
}

export interface PostI {
  _id: ID;
  title: string;
  content: string;
  status: PostType;
  createdAt: string;
}

export interface PostProps extends PostI {
  adminView: boolean;
  handleRefreshPosts: () => Promise<void>;
}

export type PostType = "pending" | "approved";
