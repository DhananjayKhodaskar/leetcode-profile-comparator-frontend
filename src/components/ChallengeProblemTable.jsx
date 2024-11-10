import { useGetActiveChallengeProblemsQuery } from "@/services/challenge";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SelectCategoryDropdown } from "./SelectCategoryDropdown";
import { SelectUserProblemTableDropdown } from "./SelectUserProblemTableDropdown";
import { DataTableDemo } from "./DataTableDemo";
import { useParams } from "react-router-dom";

const ChallengeProblemTable = ({ joinedUsers, activeChallengeId }) => {
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.user.user);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    limit: 10,
    selectedCategories: [],
  });
  const [selectedUserId, setSelectedUserId] = useState(user?._id);
  const {
    data: response,
    error,
    isFetching: problemsFetching,
    isLoading,
    refetch: refetchProblems,
  } = useGetActiveChallengeProblemsQuery({
    groupId: groupId,
    userId: selectedUserId,
    page: paginationData.page,
    limit: paginationData.limit,
    categories: paginationData.selectedCategories.join(","),
  });
  const disableTableFunctionality = user._id !== selectedUserId;

  const data = response?.data || {};
  const { totalProblems, totalPages, currentPage, categories, problems } = data;

  return (
    <>
      <SelectCategoryDropdown
        categories={categories}
        paginationData={paginationData}
        setPaginationData={setPaginationData}
      />
      <SelectUserProblemTableDropdown
        joinedUsers={joinedUsers}
        setSelectedUserId={setSelectedUserId}
        selectedUserId={selectedUserId}
        user={user}
      />
      <DataTableDemo
        problems={problems}
        totalProblems={totalProblems}
        currentPage={currentPage}
        categories={categories}
        totalPages={totalPages}
        activeChallengeId={activeChallengeId}
        refetchProblems={refetchProblems}
        problemsFetching={problemsFetching}
        disableTableFunctionality={disableTableFunctionality}
        paginationData={paginationData}
        setPaginationData={setPaginationData}
      />
    </>
  );
};

export default ChallengeProblemTable;
