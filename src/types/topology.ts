export interface TopologyNode {
  ip: string;
  port: number | null;
  clientId: string;
  rating: number | null;
  connectedClients: TopologyNode[];
}

export interface TopologyData extends TopologyNode {}
