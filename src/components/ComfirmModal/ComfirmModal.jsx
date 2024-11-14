import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import PropTypes from "prop-types";

export default function ConfirmModal({
  isOpen,
  onClose,
  buttonTitle,
  buttonDescription,
  onClickConfirm,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>{buttonTitle}</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col my-4 space-y-1 items-center'>
          <img
            src='./warning_sign.svg'
            alt='warning'
            width={100}
            height={100}
          />
          <p>{buttonDescription}</p>
        </div>
        <DialogFooter>
          <Button
            className='w-full bg-amber-500 hover:bg-amber-600'
            onClick={onClickConfirm}
          >
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  buttonTitle: PropTypes.string,
  buttonDescription: PropTypes.string,
  onClickConfirm: PropTypes.func,
};
