import { memo, MouseEventHandler, SyntheticEvent } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import React from "react";

import ErrorStack from "../../error/ErrorStack";
import { TabBar, TabItem } from "../../TabBar";
import SearchField from "@components/input/SearchField";
import { useTheme } from "@mui/material";

export interface CardTableProps {
  error?: boolean;
  children?: React.ReactNode | React.ReactElement;
  onReload?: MouseEventHandler<HTMLButtonElement> | undefined;
  errorType?: string;
  searchField?: boolean;
  withTabs?: boolean;
  errorMessage?: string;
  tabs?: TabItem[];
  tabIndex?: number | string;
  onChangeTab?: (e: SyntheticEvent<Element, Event>, value: number | string) => void;
  searchValue: string;
  searchPlaceholder?: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightContent?: React.ReactNode;
}

const CardTable = ({
  error,
  onReload,
  children,
  errorType,
  withTabs,
  searchField,
  errorMessage,
  tabs,
  tabIndex,
  onChangeTab,
  searchValue,
  onChangeSearch,
  searchPlaceholder,
  rightContent,
}: CardTableProps): React.ReactElement => {
  const theme = useTheme();

  const renderContent = (): React.ReactElement => {
    if (error) {
      return (
        <ErrorStack
          reloadButton={error}
          type={errorType}
          onReload={onReload}
          message={errorMessage}
        />
      );
    }

    return (
      <Box mx={2}>
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {searchField && <SearchField width={400} placeholder={searchPlaceholder} />}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>{rightContent}</div>
        </Box>
        <Box mb={2}>{children}</Box>
      </Box>
    );
  };

  return (
    <Card>
      {withTabs && (
        <TabBar
          theme={theme}
          value={tabIndex as string | number}
          onChange={onChangeTab}
          tabs={tabs as TabItem[]}
        />
      )}
      {renderContent()}
    </Card>
  );
};

export default memo(CardTable);
