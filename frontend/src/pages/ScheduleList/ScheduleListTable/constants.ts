import { ETableView } from "common/enums";

export function getGridConfig(view: ETableView) {
  if (!view || view === ETableView.LIST) return;

  return {
    gutter: 16,
  };
}
