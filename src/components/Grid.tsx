import React from "react"
import { Row as AntRow, Col as AntCol, RowProps, ColProps } from "antd"

export const Row: React.FC<RowProps> = (props) => <AntRow {...props} />
export const Col: React.FC<ColProps> = (props) => <AntCol {...props} />
