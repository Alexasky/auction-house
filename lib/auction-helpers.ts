import type { AuctionItem } from "@/types/auction";

export const getStatusColor = (status: AuctionItem["status"]) => {
  switch (status) {
    case "live":
      return "bg-destructive text-destructive-foreground";
    case "upcoming":
      return "bg-secondary text-secondary-foreground";
    case "ended":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getStatusText = (status: AuctionItem["status"]) => {
  switch (status) {
    case "live":
      return "Live Now";
    case "upcoming":
      return "Upcoming";
    case "ended":
      return "Ended";
    default:
      return status;
  }
};