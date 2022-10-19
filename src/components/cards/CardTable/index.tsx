import { memo, MouseEventHandler, SyntheticEvent } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import ErrorStack from "../../error/ErrorStack";
import { TabBar, TabItem } from "../../TabBar";
import SearchField from "@components/input/SearchField";

export interface CardTableProps {
  error?: boolean;
  children?: React.ReactNode | React.ReactElement;
  onReload?: MouseEventHandler<HTMLButtonElement> | undefined;
  errorType?: string;
  searchField?: boolean;
  withTabs?: boolean;
  errorMessage?: string;
  tabs: TabItem[];
  tabIndex: number;
  onChangeTab?: (e: SyntheticEvent<Element, Event>, value: number) => void;
  searchValue: string;
  searchPlaceholder?: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  tabIndex = 0,
  onChangeTab,
  searchValue,
  onChangeSearch,
  searchPlaceholder,
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
        {searchField && <SearchField width={400} placeholder={searchPlaceholder} />}
        <Box mb={2}>{children}</Box>
      </Box>
    );
  };

  return (
    <Card>
      {withTabs && <TabBar theme={theme} value={tabIndex} onChange={onChangeTab} tabs={tabs} />}
      {renderContent()}
    </Card>
  );
};

export default memo(CardTable);
