export type ShoppingItem = {
  id: string;
  name: string;
  isCompleted: boolean;
  completedAtTimestamp?: number | null;
  updatedAtTimestamp: number;
};
