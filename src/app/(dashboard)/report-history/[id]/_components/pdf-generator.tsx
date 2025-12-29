/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PdfGeneratorProps {
  sessionData: any;
}

const PdfGenerator = ({ sessionData }: PdfGeneratorProps) => {
  const generatePDF = async () => {
    try {
      // Create PDF instance
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20; // Increased margin for better alignment
      let yPos = margin;

      // Get all data
      const aiData = sessionData?.aiRaw || {};
      const riskFlags = aiData?.risk_flags || [];
      const highRisk = riskFlags.filter((f: any) => f.severity === "high");
      const mediumRisk = riskFlags.filter((f: any) => f.severity === "medium");
      const lowRisk = riskFlags.filter((f: any) => f.severity === "low");

      const scores = aiData?.scores || {};
      const alignmentScore =
        sessionData?.score || scores?.documentation_quality || 0;
      const consistencyScore = scores?.consistency_score || 0;
      const complianceScore = scores?.compliance_score || 0;

      const summary = aiData?.summary || {};
      const consistencyChecks = aiData?.consistency_checks || {};
      const pdpmAlignment = aiData?.pdpm_alignment || {};

      // Helper function to add heading with center alignment
      const addHeading = (text: string) => {
        pdf.setFontSize(18);
        pdf.setFont("helvetica", "bold");

        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = margin;
        }

        const textWidth = pdf.getTextWidth(text);
        const xPos = (pageWidth - textWidth) / 2;

        pdf.text(text, xPos, yPos);
        yPos += 10;

        // Add underline
        pdf.setLineWidth(0.5);
        pdf.line(xPos - 10, yPos, xPos + textWidth + 10, yPos);
        yPos += 15;
      };

      // Helper function to add subheading with left alignment
      const addSubheading = (text: string) => {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");

        if (yPos > pageHeight - 20) {
          pdf.addPage();
          yPos = margin;
        }

        pdf.text(text, margin, yPos);
        yPos += 8;

        // Add small underline
        pdf.setLineWidth(0.3);
        pdf.line(margin, yPos - 2, margin + 50, yPos - 2);
        yPos += 5;
      };

      // Helper function to add section title
      const addSectionTitle = (text: string, fontSize: number = 16) => {
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", "bold");

        if (yPos > pageHeight - 25) {
          pdf.addPage();
          yPos = margin;
        }

        pdf.text(text, margin, yPos);
        yPos += 10;

        // Add divider line
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 15;
      };

      // Cover Page
      pdf.setFillColor(31, 41, 59); // #1E293B
      pdf.rect(0, 0, pageWidth, 80, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.setFont("helvetica", "bold");

      // Center align title
      const title = "MDS ALIGNMENT REPORT";
      const titleWidth = pdf.getTextWidth(title);
      pdf.text(title, (pageWidth - titleWidth) / 2, 45);

      pdf.setFontSize(16);
      const subtitle = "Professional Session Analysis";
      const subtitleWidth = pdf.getTextWidth(subtitle);
      pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, 60);

      // Add date
      pdf.setFontSize(12);
      const dateText = `Generated: ${new Date().toLocaleDateString()}`;
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.text(dateText, (pageWidth - dateWidth) / 2, 70);

      yPos = 100;
      pdf.setTextColor(0, 0, 0);

      // Session Info Box - Properly aligned
      const boxWidth = pageWidth - 2 * margin;
      const boxHeight = 40;

      pdf.setFillColor(248, 250, 252); // #F8FAFC
      pdf.rect(margin, yPos - 5, boxWidth, boxHeight, "F");

      pdf.setDrawColor(226, 232, 240); // #E2E8F0
      pdf.setLineWidth(0.5);
      pdf.rect(margin, yPos - 5, boxWidth, boxHeight);

      // Create two columns for session info
      const column1X = margin + 15;
      const column2X = margin + boxWidth / 2;

      const sessionInfoLeft = [
        ["Session ID", sessionData?._id?.slice(-7)?.toUpperCase() || "N/A"],
        [
          "Processed Date",
          sessionData?.createdAt
            ? new Date(sessionData.createdAt).toLocaleDateString()
            : "N/A",
        ],
      ];

      const sessionInfoRight = [
        ["Risk Level", sessionData?.riskLevel?.toUpperCase() || "N/A"],
        ["Alignment Score", `${alignmentScore}%`],
      ];

      sessionInfoLeft.forEach(([label, value], index) => {
        const rowY = yPos + index * 12;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${label}:`, column1X, rowY);

        pdf.setFont("helvetica", "normal");
        pdf.text(value, column1X + 40, rowY);
      });

      sessionInfoRight.forEach(([label, value], index) => {
        const rowY = yPos + index * 12;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${label}:`, column2X, rowY);

        pdf.setFont("helvetica", "normal");
        const xPos = column2X + 40;
        pdf.text(value, xPos, rowY);

        // Add progress bar for alignment score
        if (label === "Alignment Score") {
          const barWidth = 30;
          const barX = xPos + 10;
          const barY = rowY - 3;

          pdf.setDrawColor(226, 232, 240);
          pdf.setLineWidth(0.5);
          pdf.rect(barX, barY, barWidth, 4);

          pdf.setFillColor(31, 41, 59);
          const filledWidth = (alignmentScore / 100) * barWidth;
          pdf.rect(barX, barY, filledWidth, 4, "F");
        }
      });

      yPos += boxHeight + 15;

      // Table of Contents - Better alignment
      addHeading("TABLE OF CONTENTS");

      const contents = [
        { num: "1.", title: "Executive Summary" },
        { num: "2.", title: "Key Observations" },
        { num: "3.", title: "Risk Analysis" },
        { num: "4.", title: "PDPM Alignment" },
        { num: "5.", title: "Consistency Checks" },
        { num: "6.", title: "Detailed Scores" },
        { num: "7.", title: "Recommendations" },
      ];

      contents.forEach((item) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = margin;
        }

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        // Left align numbers
        pdf.text(item.num, margin + 5, yPos);

        // Add dots
        const dotStart = margin + 15;
        const dotEnd = pageWidth - margin - 50;
        const dotSpacing = 3;
        let dotX = dotStart;

        while (dotX < dotEnd) {
          pdf.text(".", dotX, yPos);
          dotX += dotSpacing;
        }

        // Right align titles
        pdf.text(
          item.title,
          pageWidth - margin - pdf.getTextWidth(item.title),
          yPos
        );

        yPos += 8;
      });

      yPos += 10;

      // Page 2: Executive Summary
      pdf.addPage();
      yPos = margin;

      addSectionTitle("1. EXECUTIVE SUMMARY");

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      const summaryText = sessionData?.summaryReview || "No summary available";
      const summaryLines = pdf.splitTextToSize(
        summaryText,
        pageWidth - 2 * margin
      );

      summaryLines.forEach((line: string) => {
        if (yPos > pageHeight - margin) {
          pdf.addPage();
          yPos = margin;
        }
        pdf.text(line, margin, yPos);
        yPos += 6;
      });

      yPos += 10;

      // Page 3: Key Observations
      addSectionTitle("2. KEY OBSERVATIONS");

      const observationItems = [
        { key: "session_type", label: "Session Type" },
        { key: "presenting_concerns", label: "Presenting Concerns" },
        { key: "interventions_used", label: "Interventions Used" },
        { key: "response", label: "Response" },
        { key: "progress_toward_goals", label: "Progress Toward Goals" },
        { key: "clinical_impression", label: "Clinical Impression" },
        { key: "safety_concerns", label: "Safety Concerns" },
        { key: "follow_up", label: "Follow-up Recommendations" },
      ];

      observationItems.forEach((item) => {
        if (summary[item.key]) {
          if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
          }

          pdf.setFontSize(11);
          pdf.setFont("helvetica", "bold");

          // Calculate position for label
          const label = `• ${item.label}:`;
          pdf.text(label, margin + 5, yPos);

          // Calculate text width for proper alignment
          const labelWidth = pdf.getTextWidth(label);

          pdf.setFont("helvetica", "normal");
          const content = summary[item.key];
          const contentLines = pdf.splitTextToSize(
            content,
            pageWidth - margin - labelWidth - 10
          );

          contentLines.forEach((line: string, index: number) => {
            if (index === 0) {
              pdf.text(line, margin + labelWidth + 10, yPos);
            } else {
              yPos += 5;
              pdf.text(line, margin + 20, yPos);
            }
          });

          yPos += 8;
        }
      });

      // Page 4: Risk Analysis
      pdf.addPage();
      yPos = margin;

      addSectionTitle("3. RISK ANALYSIS");

      // Risk summary
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(`Total Risk Flags Detected: ${riskFlags.length}`, margin, yPos);
      yPos += 10;

      // Risk Flags - Better table layout
      if (riskFlags.length > 0) {
        riskFlags.forEach((flag: any, index: number) => {
          if (yPos > pageHeight - 80) {
            pdf.addPage();
            yPos = margin;
          }

          // Flag header with color and proper alignment
          const severityColor =
            flag.severity === "high"
              ? [239, 68, 68]
              : flag.severity === "medium"
              ? [245, 158, 11]
              : [34, 197, 94];

          const headerHeight = 10;
          const headerWidth = pageWidth - 2 * margin;

          pdf.setFillColor(
            severityColor[0],
            severityColor[1],
            severityColor[2]
          );
          pdf.rect(margin, yPos, headerWidth, headerHeight, "F");

          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "bold");

          const headerText = `RISK FLAG ${index + 1} - ${
            flag.category
          } (${flag.severity.toUpperCase()})`;
          const headerTextWidth = pdf.getTextWidth(headerText);
          const headerX = margin + (headerWidth - headerTextWidth) / 2;

          pdf.text(headerText, headerX, yPos + 7);

          yPos += headerHeight + 5;
          pdf.setTextColor(0, 0, 0);

          // Flag details in a table format
          const details = [
            { label: "Description:", value: flag.description },
            {
              label: "Why it matters:",
              value: flag.why_it_matters || "Not specified",
            },
            { label: "Evidence:", value: flag.evidence || "Not specified" },
            { label: "Severity:", value: flag.severity.toUpperCase() },
          ];

          details.forEach((detail) => {
            if (yPos > pageHeight - 30) {
              pdf.addPage();
              yPos = margin;
            }

            pdf.setFontSize(9);
            pdf.setFont("helvetica", "bold");
            pdf.text(detail.label, margin + 10, yPos);

            const labelWidth = pdf.getTextWidth(detail.label);
            pdf.setFont("helvetica", "normal");

            const valueLines = pdf.splitTextToSize(
              detail.value,
              pageWidth - margin - labelWidth - 20
            );
            valueLines.forEach((line: string, lineIndex: number) => {
              if (lineIndex === 0) {
                pdf.text(line, margin + labelWidth + 15, yPos);
              } else {
                yPos += 4;
                pdf.text(line, margin + 25, yPos);
              }
            });

            yPos += 8;
          });

          // Add separator between flags
          if (index < riskFlags.length - 1) {
            pdf.setDrawColor(226, 232, 240);
            pdf.setLineWidth(0.3);
            pdf.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 15;
          }
        });
      } else {
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "italic");
        pdf.text("No risk flags detected.", margin, yPos);
        yPos += 10;
      }

      // Page 5: PDPM Alignment and Consistency Checks
      pdf.addPage();
      yPos = margin;

      // PDPM Alignment
      addSectionTitle("4. PDPM ALIGNMENT");

      if (pdpmAlignment.summary) {
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        const pdpmLines = pdf.splitTextToSize(
          pdpmAlignment.summary,
          pageWidth - 2 * margin
        );

        pdpmLines.forEach((line: string) => {
          if (yPos > pageHeight - margin) {
            pdf.addPage();
            yPos = margin;
          }
          pdf.text(line, margin, yPos);
          yPos += 5;
        });

        yPos += 5;
      }

      if (pdpmAlignment.notes) {
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "italic");
        pdf.text("Note:", margin, yPos);

        const noteLines = pdf.splitTextToSize(
          pdpmAlignment.notes,
          pageWidth - 2 * margin - 20
        );
        noteLines.forEach((line: string, index: number) => {
          if (index === 0) {
            pdf.text(line, margin + 20, yPos);
          } else {
            yPos += 4;
            pdf.text(line, margin + 20, yPos);
          }
        });

        yPos += 10;
      }

      // Consistency Checks
      addSectionTitle("5. CONSISTENCY CHECKS");

      const consistencyItems = [
        { key: "adl_conflicts", label: "ADL Conflicts" },
        { key: "behavior_conflicts", label: "Behavior Conflicts" },
        { key: "therapy_conflicts", label: "Therapy Conflicts" },
        { key: "pain_conflicts", label: "Pain Conflicts" },
        { key: "diagnosis_alignment", label: "Diagnosis Alignment" },
      ];

      consistencyItems.forEach((item) => {
        if (consistencyChecks[item.key]) {
          if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
          }

          pdf.setFontSize(11);
          pdf.setFont("helvetica", "bold");

          const label = `• ${item.label}:`;
          pdf.text(label, margin + 5, yPos);

          const labelWidth = pdf.getTextWidth(label);
          pdf.setFont("helvetica", "normal");

          const contentLines = pdf.splitTextToSize(
            consistencyChecks[item.key],
            pageWidth - margin - labelWidth - 10
          );

          contentLines.forEach((line: string, index: number) => {
            if (index === 0) {
              pdf.text(line, margin + labelWidth + 10, yPos);
            } else {
              yPos += 4;
              pdf.text(line, margin + 20, yPos);
            }
          });

          yPos += 8;
        }
      });

      // Page 6: Detailed Scores and Recommendations
      pdf.addPage();
      yPos = margin;

      // Detailed Scores
      addSectionTitle("6. DETAILED SCORES");

      const scoreDetails = [
        {
          label: "Overall Alignment Score",
          value: `${alignmentScore}%`,
          showBar: true,
        },
        {
          label: "Documentation Quality",
          value: `${scores.documentation_quality || 0}%`,
          showBar: true,
        },
        {
          label: "Consistency Score",
          value: `${consistencyScore}%`,
          showBar: true,
        },
        {
          label: "Compliance Score",
          value: `${complianceScore}%`,
          showBar: true,
        },
        {
          label: "Risk Assessment",
          value: scores.risk_level || "Not assessed",
          showBar: false,
        },
      ];

      const scoreStartX = margin;
      const barStartX = pageWidth - margin - 80;

      scoreDetails.forEach((item) => {
        if (yPos > pageHeight - 20) {
          pdf.addPage();
          yPos = margin;
        }

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.label, scoreStartX, yPos);

        pdf.setFont("helvetica", "normal");
        const valueX = pageWidth - margin - pdf.getTextWidth(item.value);
        pdf.text(item.value, valueX, yPos);

        if (item.showBar) {
          const scoreValue = parseInt(item.value) || 0;
          const barWidth = 60;
          const barY = yPos - 3;

          // Bar background
          pdf.setDrawColor(226, 232, 240);
          pdf.setLineWidth(0.5);
          pdf.rect(barStartX, barY, barWidth, 6);

          // Filled bar
          const filledWidth = (scoreValue / 100) * barWidth;
          pdf.setFillColor(31, 41, 59);
          pdf.rect(barStartX, barY, filledWidth, 6, "F");

          // Percentage inside bar
          if (filledWidth > 15) {
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(8);
            pdf.text(`${scoreValue}%`, barStartX + 5, barY + 4);
            pdf.setTextColor(0, 0, 0);
          }
        }

        yPos += 12;
      });

      // Risk Distribution - Better visualization
      yPos += 10;
      addSubheading("Risk Distribution");

      const riskDistribution = [
        {
          label: "High Risk",
          count: highRisk.length,
          color: "#EF4444",
          percent: riskFlags.length
            ? Math.round((highRisk.length / riskFlags.length) * 100)
            : 0,
        },
        {
          label: "Medium Risk",
          count: mediumRisk.length,
          color: "#F59E0B",
          percent: riskFlags.length
            ? Math.round((mediumRisk.length / riskFlags.length) * 100)
            : 0,
        },
        {
          label: "Low Risk",
          count: lowRisk.length,
          color: "#22C55E",
          percent: riskFlags.length
            ? Math.round((lowRisk.length / riskFlags.length) * 100)
            : 0,
        },
      ];

      const maxCount = Math.max(
        highRisk.length,
        mediumRisk.length,
        lowRisk.length
      );
      const barMaxWidth = 60;

      riskDistribution.forEach((item) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = margin;
        }

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.label, margin, yPos);

        pdf.setFont("helvetica", "normal");
        const countText = `${item.count} flags (${item.percent}%)`;
        const countX = margin + 50;
        pdf.text(countText, countX, yPos);

        // Bar visualization
        const barWidth =
          maxCount > 0 ? (item.count / maxCount) * barMaxWidth : 0;
        const barX = countX + 50;
        const barY = yPos - 3;

        const rgb = hexToRgb(item.color);
        if (rgb) {
          pdf.setFillColor(rgb.r, rgb.g, rgb.b);
          pdf.rect(barX, barY, barWidth, 6, "F");
        }

        yPos += 10;
      });

      // Recommendations - Better formatting
      yPos += 10;
      addSectionTitle("7. RECOMMENDATIONS");

      const recommendations = [
        "Review all highlighted documentation inconsistencies",
        "Clarify ambiguous or contradictory entries with relevant staff",
        "Ensure consistent support for skilled needs across all documentation",
        "Update care plans to reflect accurate assessment findings",
        "Implement regular documentation quality audits",
        "Provide staff training on MDS documentation requirements",
        "Establish follow-up procedures for high-risk findings",
      ];

      recommendations.forEach((rec, index) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = margin;
        }

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.text(`${index + 1}. ${rec}`, margin + 5, yPos);
        yPos += 7;
      });

      // Footer on last page - Better alignment
      yPos = pageHeight - 15;
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPos, pageWidth - margin, yPos);

      yPos += 5;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139); // #64748B
      pdf.setFont("helvetica", "normal");

      // Left aligned text
      const generatedText = `Generated: ${new Date().toLocaleString()}`;
      pdf.text(generatedText, margin, yPos);

      // Center aligned text
      const pageText = `Page ${pdf.getNumberOfPages()}`;
      const pageTextWidth = pdf.getTextWidth(pageText);
      pdf.text(pageText, (pageWidth - pageTextWidth) / 2, yPos);

      // Right aligned text
      const copyrightText = "© MDS Alignment System";
      const copyrightWidth = pdf.getTextWidth(copyrightText);
      pdf.text(copyrightText, pageWidth - margin - copyrightWidth, yPos);

      // Save PDF
      const fileName = `MDS-Report-${
        sessionData?._id?.slice(-7) || "unknown"
      }-${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  return (
    <Button
      className="bg-[#1E293B] text-white hover:bg-[#0F172A] gap-2"
      onClick={generatePDF}
    >
      <Download className="w-4 h-4" /> Download PDF Report
    </Button>
  );
};

export default PdfGenerator;
