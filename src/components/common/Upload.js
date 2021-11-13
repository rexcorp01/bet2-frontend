import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Upload = (props) => {
  const { setFile, children } = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      props.setFile(acceptedFiles);
    },
    [props]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ display: "inline-block" }}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default Upload;
