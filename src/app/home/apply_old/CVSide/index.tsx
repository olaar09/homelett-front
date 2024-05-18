import React, { useState } from "react";
import CV_1 from "./CV_1/CVSide";
import { ICV } from "@/app/interfaces/ICV";
import CV_2 from "./CV_2/CVSide";
import { Str } from "@/utils/consts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FloatButton } from "antd";

const CVContainer = (props: {
  data: ICV;
  selected: string;
  onShuffleCV: () => void;
}) => {
  // Render the selected CV component
  const renderSelectedCV = () => {
    switch (props.selected) {
      case Str.CV_TEMPLATES.CV_1.key:
        return (
          <CV_1
            jProfile={props.data.jProfile}
            experiences={props.data.experiences}
            loadingExperiences={props.data.loadingExperiences}
            loadingCV={props.data.loadingCV}
            coverLetter={props.data.coverLetter}
            onToggleInsights={props.data.onToggleInsights}
          />
        );
      case Str.CV_TEMPLATES.CV_2.key:
        return (
          <CV_2
            jProfile={props.data.jProfile}
            experiences={props.data.experiences}
            loadingExperiences={props.data.loadingExperiences}
            loadingCV={props.data.loadingCV}
            coverLetter={props.data.coverLetter}
            onToggleInsights={props.data.onToggleInsights}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full">
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 94 }}
        icon={<Icon icon={"majesticons:open"} />}
      >
        <FloatButton
          tooltip={<div>Download CV</div>}
          icon={<Icon icon={"mingcute:file-download-line"} />}
        />
        <FloatButton
          tooltip={<div>Edit CV</div>}
          icon={<Icon icon={"material-symbols-light:edit-note"} />}
        />
        <FloatButton
          onClick={props.data.onToggleInsights}
          tooltip={<div>View Job Information</div>}
          icon={<Icon icon={"solar:document-text-bold"} />}
        />
        <FloatButton
          onClick={props.onShuffleCV}
          tooltip={<div>Change CV Template</div>}
          icon={<Icon icon={"mingcute:shuffle-2-line"} />}
        />
      </FloatButton.Group>

      {/*   <FloatButton
        onClick={props.data.onToggleInsights}
        style={{ width: 200 }}
        description={
          <div className="flex items-center gap-x-1">
            <Icon
              className="text-lg text-primary"
              icon={"majesticons:analytics"}
            />
            <span className="  text-sm">View Job Description</span>
          </div>
        }
        shape="square"
      />{" "} */}

      {renderSelectedCV()}
    </div>
  );
};

export default CVContainer;
