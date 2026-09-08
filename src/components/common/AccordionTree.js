"use client";

import { themes } from "@/constants/Themes";
import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary
} from "@mui/joy";

function buildGridTemplate(columns = []) {
  return columns
    .map((col) => {
      if (col.flex) return `${col.flex}fr`;
      if (col.minWidth) return `minmax(${col.minWidth}px, 1fr)`;
      return "1fr";
    })
    .join(" ");
}

export default function AccordionTree({
  data = [],
  columns = [],
  getId = (node) => node.id,
  getChildren = (node) => node.children || [],
  onExpand,
  pagination,
  setPagination,
  totalCount
}) {
  const GRID_TEMPLATE = buildGridTemplate(columns);
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID_TEMPLATE,
          background: "#fafafa",
          borderBottom: "1px solid #e0e0e0",
          padding: "12px 16px"
        }}
      >
        {columns.map((col, i) => (
          <div
            key={i}
            style={{
              textAlign: col.align || col.headerAlign || "left",
              fontSize: "13px",
              fontWeight: 600,
              color: "#616161"
            }}
          >
            {col?.headerName}
          </div>
        ))}
      </div>
      <AccordionGroup>
        <TreeNode
          nodes={data}
          columns={columns}
          getId={getId}
          getChildren={getChildren}
          onExpand={onExpand}
          level={0}
        />
      </AccordionGroup>
      <TableFooter
        page={pagination?.page || 0}
        pageSize={pagination?.pageSize || 10}
        total={totalCount}
        onPageChange={(newPage) =>
          setPagination((prev) => ({
            ...prev,
            page: Math.max(0, newPage)
          }))
        }
        onPageSizeChange={(size) =>
          setPagination({
            page: 0,
            pageSize: size
          })
        }
      />
    </div>
  );
}

function TreeNode({ nodes, columns, getId, getChildren, onExpand, level = 0 }) {
  return nodes.map((node) => {
    const id = getId(node);
    const children = getChildren(node) || [];
    const leaf = children?.length === 0;

    return (
      <Accordion
        key={id}
        onChange={(e, expanded) => {
          if (expanded && !leaf) {
            onExpand?.(node);
          }
        }}
      >
        <AccordionSummary
          indicator={
            leaf ?
              <div style={{ width: "18px" }}></div>
            : <ExpandMoreOutlined />
          }
          sx={{
            flexDirection: "row-reverse",
            height: themes.searchBarHeight,
            background: "#f5f7f8",
            "& .MuiAccordionSummary-button": {
              flexDirection: "row-reverse",
              justifyContent: "left",
              pr: 0
            },

            "& .MuiSvgIcon-root": {
              color: themes.tertiaryColor,
              fontSize: "25px"
            }
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: buildGridTemplate(columns),
              width: "100%",
              alignItems: "center",
              fontSize: themes.baseFontSize
            }}
          >
            {columns.map((col, i) => {
              return (
                <div
                  key={i}
                  style={{
                    textAlign: col.align || col.headerAlign || "left"
                  }}
                >
                  {col?.renderCell ?
                    col?.renderCell({ row: node, value: node?.[col?.field] })
                  : <></>}
                </div>
              );
            })}
          </div>
        </AccordionSummary>

        {!leaf && (
          <AccordionDetails
            sx={{
              "& .MuiAccordionDetails-content": {
                pr: 0
              }
            }}
          >
            <TreeNode
              nodes={children}
              columns={columns}
              getId={getId}
              getChildren={getChildren}
              onExpand={onExpand}
              level={level + 1}
            />
          </AccordionDetails>
        )}
      </Accordion>
    );
  });
}

const navBtnStyle = {
  border: "1px solid #ddd",
  background: "white",
  borderRadius: 4,
  width: 28,
  height: 28,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

function TableFooter({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange
}) {
  const totalPages = Math.ceil(total / pageSize);

  const from = total === 0 ? 0 : page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, total);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        borderTop: "1px solid #e0e0e0",
        background: "#fafafa",
        fontSize: "13px",
        color: "#616161"
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span>
          {from}-{to} of {total}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>Rows:</span>

          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              border: "1px solid #ddd",
              borderRadius: 4,
              padding: "2px 6px",
              background: "white",
              fontSize: "13px"
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          style={navBtnStyle}
        >
          ‹
        </button>

        <span style={{ padding: "0 6px" }}>
          {page + 1} / {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          style={navBtnStyle}
        >
          ›
        </button>
      </div>
    </div>
  );
}
