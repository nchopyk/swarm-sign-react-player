export interface TopologyNode {
  ip: string;
  port: number | null;
  connectedClients: TopologyNode[] | null;
  rating: number | null;
}

export interface TopologyData extends TopologyNode {}
