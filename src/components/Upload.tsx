import React from "react"
import { Upload as AntUpload, UploadProps as AntUploadProps } from "antd"

export const Upload: React.FC<AntUploadProps> = (props) => <AntUpload {...props} />
export default Upload
