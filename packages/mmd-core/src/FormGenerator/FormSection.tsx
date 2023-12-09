import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Icon,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { TFormSection } from "../types";
import { SectionGrid, SectionHeading } from "./FormComponents";

const FormSection = ({
  isViewOnly,
  name,
  label,
  noOfCols,
  formFields,
  isDisabledSection,
  isExpandableSection,
  AfterFieldComponent,
}: TFormSection) => {
  const elementSize = noOfCols ? 12 / noOfCols : 4; // Adjusted the default value

  // this is so that we can allow blank names in section name
  const isProperSection = label && label !== " ";

  const [isSectionOpen, setIsSectionOpen] = useState(false);
  if (isExpandableSection) {
    return (
      <Accordion
        style={{
          padding: "0px",
          margin: "0px",
        }}
        expanded={isSectionOpen}
        onChange={() => setIsSectionOpen((prev) => !prev)}
      >
        <AccordionSummary
          style={{
            padding: "0px",
            margin: "8px",
          }}
          aria-controls={`${name}-content`}
          id={`${name}-header`}
        >
          <Icon
            style={{
              marginRight: "8px",
              transform: `rotate(${isSectionOpen ? "45deg" : "0deg"})`,
              transition: "all 0.2s ease-in-out",
              fontSize: "16px",
            }}
          >
            <FaPlus />
          </Icon>
          <SectionHeading heading={label} />
        </AccordionSummary>
        <AccordionDetails
          style={{
            padding: "0px",
            margin: "8px",
          }}
        >
          <SectionGrid
            isViewOnly={isViewOnly}
            name={name}
            AfterFieldComponent={AfterFieldComponent}
            currentFormFields={formFields} // Assuming this is the correct variable
            elementSize={elementSize}
            isDisabledSection={isDisabledSection}
          />
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <>
      {isProperSection && <SectionHeading heading={label} />}
      <SectionGrid
        isViewOnly={isViewOnly}
        name={name}
        AfterFieldComponent={AfterFieldComponent}
        currentFormFields={formFields} // Assuming this is the correct variable
        elementSize={elementSize}
        isDisabledSection={isDisabledSection}
      />
    </>
  );
};

export default FormSection;
