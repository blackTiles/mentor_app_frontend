import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/loaders/spinner";

export default function DeleteConfirmationPopup({
  title,
  description,
  onConfirm,
  isDeleteConfirmationPopupOpen,
  setIsDeleteConfirmationPopupOpen,
  deletingAssignment,
}: {
  title: string;
  description: string;
  onConfirm: () => void;
  isDeleteConfirmationPopupOpen: boolean;
  setIsDeleteConfirmationPopupOpen: (open: boolean) => void;
  deletingAssignment?: boolean;
}) {
  return (
    <Dialog
      open={isDeleteConfirmationPopupOpen}
      onOpenChange={setIsDeleteConfirmationPopupOpen}
    >
      <DialogContent className="bg-gray-50 border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">{title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsDeleteConfirmationPopupOpen(false)}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={deletingAssignment}
            className="bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-500 focus:ring-opacity-30"
          >
            {deletingAssignment ? <Spinner size="w-5 h-5" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
