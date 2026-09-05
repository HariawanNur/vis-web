"use client";

import React from "react";
import { Skeleton as AntSkeleton } from "antd";
import { createStyles } from "antd-style";
import { Flex } from "@/components";

const useStyles = createStyles(({ css, token }) => ({
  shimmer: css`
    .ant-skeleton-content .ant-skeleton-title,
    .ant-skeleton-content .ant-skeleton-paragraph > li,
    .ant-skeleton-avatar,
    .ant-skeleton-image {
      background: linear-gradient(
        90deg,
        ${token.colorFillQuaternary} 25%,
        ${token.colorFillTertiary} 37%,
        ${token.colorFillQuaternary} 63%
      );
      background-size: 200% 100%;
      animation: ant-skeleton-loading 1.4s ease infinite;
    }
  `,
  cardSkeleton: css`
    border-radius: 16px;
    border: 1px solid #ebf1ff;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
    background: #ffffff;
    padding: 16px;
  `,
  kpiGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 16px;
  `,
  kpiCard: css`
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
    background: #ffffff;
    padding: 16px;
  `,
  projectRow: css`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 16px;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  `,
  imageSkeleton: css`
    width: 148px;
    min-width: 148px;
    height: 108px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
    background: ${token.colorFillQuaternary};

    @media (max-width: 767px) {
      width: 100%;
      min-width: 0;
      height: 180px;
    }
  `,
  contentSkeleton: css`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
  `,
  filterRow: css`
    display: flex;
    gap: 8px;
    overflow: hidden;
  `,
  chipSkeleton: css`
    height: 32px;
    width: 80px;
    border-radius: 999px;
    background: ${token.colorFillQuaternary};
    flex-shrink: 0;
  `,
}));

export const ProjectCardSkeleton: React.FC = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.projectRow}>
        <div className={styles.imageSkeleton} />
        <div className={styles.contentSkeleton}>
          <div>
            <Flex align="center" gap={8} style={{ marginBottom: 8 }}>
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 72, height: 22, borderRadius: 999 }}
              />
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 100, height: 16, borderRadius: 4 }}
              />
            </Flex>
            <AntSkeleton.Input
              active
              style={{
                width: "60%",
                height: 20,
                borderRadius: 6,
                marginBottom: 6,
              }}
            />
            <Flex gap={8}>
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 80, height: 14, borderRadius: 4 }}
              />
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 60, height: 14, borderRadius: 4 }}
              />
            </Flex>
          </div>
          <div>
            <Flex align="center" gap={10} style={{ marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    height: 6,
                    borderRadius: 999,
                    background: "#EBF1FF",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "45%",
                      height: "100%",
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, #D6E2FF 25%, #EBF1FF 37%, #D6E2FF 63%)",
                      backgroundSize: "200% 100%",
                      animation: "ant-skeleton-loading 1.4s ease infinite",
                    }}
                  />
                </div>
              </div>
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 36, height: 16, borderRadius: 4 }}
              />
            </Flex>
            <Flex justify="space-between" align="center">
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 120, height: 14, borderRadius: 4 }}
              />
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 80, height: 14, borderRadius: 4 }}
              />
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Flex vertical gap={16}>
      <div className={styles.kpiGrid}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.kpiCard}>
            <Flex align="center" justify="space-between" gap={12}>
              <div style={{ flex: 1 }}>
                <AntSkeleton.Input
                  active
                  size="small"
                  style={{
                    width: "70%",
                    height: 12,
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                />
                <AntSkeleton.Input
                  active
                  style={{
                    width: "50%",
                    height: 28,
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                />
                <AntSkeleton.Input
                  active
                  size="small"
                  style={{ width: "60%", height: 12, borderRadius: 4 }}
                />
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  background: "#F1F5F9",
                }}
              />
            </Flex>
          </div>
        ))}
      </div>

      <div className={styles.cardSkeleton}>
        <AntSkeleton.Input
          active
          style={{
            width: "40%",
            height: 20,
            borderRadius: 6,
            marginBottom: 16,
          }}
        />
        <Flex vertical gap={12}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Flex key={i} align="center" gap={12}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#F1F5F9",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <AntSkeleton.Input
                  active
                  size="small"
                  style={{
                    width: "80%",
                    height: 14,
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                />
                <AntSkeleton.Input
                  active
                  size="small"
                  style={{ width: "50%", height: 12, borderRadius: 4 }}
                />
              </div>
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: 60, height: 14, borderRadius: 4 }}
              />
            </Flex>
          ))}
        </Flex>
      </div>

      <div className={styles.cardSkeleton}>
        <AntSkeleton.Input
          active
          style={{
            width: "35%",
            height: 20,
            borderRadius: 6,
            marginBottom: 16,
          }}
        />
        <Flex vertical gap={16}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Flex key={i} gap={12} align="flex-start">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#D6E2FF",
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <div style={{ flex: 1 }}>
                <AntSkeleton.Input
                  active
                  size="small"
                  style={{
                    width: "90%",
                    height: 14,
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                />
                <AntSkeleton.Input
                  active
                  size="small"
                  style={{ width: "65%", height: 12, borderRadius: 4 }}
                />
              </div>
            </Flex>
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export const PageSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <Flex vertical gap={16} style={{ padding: "0 4px" }}>
      <Flex justify="space-between" align="flex-start">
        <Flex vertical gap={8}>
          <AntSkeleton.Input
            active
            style={{ width: 200, height: 24, borderRadius: 6 }}
          />
          <AntSkeleton.Input
            active
            size="small"
            style={{ width: 140, height: 14, borderRadius: 4 }}
          />
        </Flex>
        <AntSkeleton.Button
          active
          style={{ width: 120, height: 40, borderRadius: 8 }}
        />
      </Flex>
      <div
        className="ant-card"
        style={{ borderRadius: 16, border: "1px solid #EBF1FF" }}
      >
        <div style={{ padding: 16 }}>
          <Flex vertical gap={12}>
            {Array.from({ length: rows }).map((_, i) => (
              <Flex key={i} align="center" gap={12}>
                <AntSkeleton.Avatar active size={40} shape="square" />
                <div style={{ flex: 1 }}>
                  <AntSkeleton.Input
                    active
                    size="small"
                    style={{
                      width: `${70 + (i % 3) * 10}%`,
                      height: 14,
                      borderRadius: 4,
                      marginBottom: 6,
                    }}
                  />
                  <AntSkeleton.Input
                    active
                    size="small"
                    style={{
                      width: `${40 + (i % 2) * 15}%`,
                      height: 12,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </Flex>
            ))}
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <div style={{ minWidth: columns * 150 }}>
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #F1F5F9",
            background: "#F8FAFC",
            padding: "12px 16px",
          }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} style={{ flex: 1, paddingRight: 16 }}>
              <AntSkeleton.Input
                active
                size="small"
                style={{ width: "70%", height: 14, borderRadius: 4 }}
              />
            </div>
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "flex",
              gap: 0,
              borderBottom: "1px solid #F1F5F9",
              padding: "14px 16px",
            }}
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <div key={colIdx} style={{ flex: 1, paddingRight: 16 }}>
                <AntSkeleton.Input
                  active
                  size="small"
                  style={{
                    width: `${50 + ((rowIdx + colIdx) % 4) * 12}%`,
                    height: 14,
                    borderRadius: 4,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const FilterSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.filterRow}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={styles.chipSkeleton}
          style={{ width: 70 + (i % 3) * 18 }}
        />
      ))}
    </div>
  );
};

export const KpiSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.kpiGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.kpiCard}>
          <Flex align="center" justify="space-between" gap={12}>
            <div style={{ flex: 1 }}>
              <AntSkeleton.Input
                active
                size="small"
                style={{
                  width: "70%",
                  height: 12,
                  borderRadius: 4,
                  marginBottom: 8,
                }}
              />
              <AntSkeleton.Input
                active
                style={{ width: "50%", height: 28, borderRadius: 6 }}
              />
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#F1F5F9",
              }}
            />
          </Flex>
        </div>
      ))}
    </div>
  );
};

export const ProjectListSkeleton: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <Flex vertical gap={12}>
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </Flex>
  );
};

export const Skeleton = Object.assign(AntSkeleton, {
  ProjectCard: ProjectCardSkeleton,
  ProjectList: ProjectListSkeleton,
  Dashboard: DashboardSkeleton,
  Page: PageSkeleton,
  Table: TableSkeleton,
  Filter: FilterSkeleton,
  Kpi: KpiSkeleton,
});

export default Skeleton;
