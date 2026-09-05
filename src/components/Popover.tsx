import React from "react"
import {
    Popover as AntPopover,
    PopoverProps as AntPopoverProps,
} from "antd"

export const Popover: React.FC<Omit<AntPopoverProps, "overlayInnerStyle">> = (props) => <AntPopover {...props} />
export default Popover
