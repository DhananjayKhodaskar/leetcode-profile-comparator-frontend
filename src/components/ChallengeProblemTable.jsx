import {
  useGetActiveChallengeProblemsQuery,
  useGetProblemsByActiveChallengeIdQuery,
} from "@/services/challenge";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SelectCategoryDropdown } from "./SelectCategoryDropdown";
import { SelectUserProblemTableDropdown } from "./SelectUserProblemTableDropdown";
import { DataTableDemo } from "./DataTableDemo";
import { useParams } from "react-router-dom";
import { SelectStatusDropdown } from "./SelectStatusDropdown";

const ChallengeProblemTable = ({
  joinedUsers,
  activeChallengeId = "",
  forHistory,
  refetchActiveChallengeDetails,
}) => {
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.user.user);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    limit: 10,
    selectedCategories: [],
    selectedStatus: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(user?._id);
  const {
    data: currProblemResponse,
    error,
    isFetching: problemsFetching,
    isLoading,
    refetch: refetchProblems,
  } = useGetActiveChallengeProblemsQuery(
    {
      groupId: groupId,
      userId: selectedUserId,
      page: paginationData.page,
      limit: paginationData.limit,
      categories: paginationData.selectedCategories.join(","),
      status: paginationData.selectedStatus,
    },
    {
      skip: forHistory,
    }
  );

  const {
    data: historyProblemResponse,
    // error,
    // isFetching: problemsFetching,
    // isLoading,
    // refetch: refetchProblems,
  } = useGetProblemsByActiveChallengeIdQuery(
    {
      activeChallengeId,
      page: paginationData.page,
      limit: paginationData.limit,
      categories: paginationData.selectedCategories.join(","),
      status: paginationData.selectedStatus,
    },
    {
      skip: !forHistory,
    }
  );

  const disableTableFunctionality = user._id !== selectedUserId;

  const data =
    (forHistory ? historyProblemResponse?.data : currProblemResponse?.data) ||
    {};
  const { totalProblems, totalPages, currentPage, categories, problems } = data;

  return (
    <>
      <div className="flex flex-row justify-between">
        <SelectCategoryDropdown
          categories={categories}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />
        <SelectStatusDropdown
          paginationData={paginationData}
          setPaginationData={setPaginationData}
          statuses={["solved", "unsolved"]}
        />
        <SelectUserProblemTableDropdown
          joinedUsers={joinedUsers}
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
          user={user}
        />
      </div>
      <DataTableDemo
        problems={problems || []}
        totalProblems={totalProblems}
        currentPage={currentPage}
        categories={categories}
        totalPages={totalPages}
        activeChallengeId={activeChallengeId}
        refetchProblems={refetchProblems}
        problemsFetching={problemsFetching}
        disableTableFunctionality={disableTableFunctionality || forHistory}
        paginationData={paginationData}
        refetchActiveChallengeDetails={refetchActiveChallengeDetails}
        setPaginationData={setPaginationData}
      />
    </>
  );
};

export default ChallengeProblemTable;
