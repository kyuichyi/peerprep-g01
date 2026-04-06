import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import type User from "../types/user";
import type Topic from "../types/topic";
import { fetchTopics } from "../services/questionService";

export interface UseMatchReturn {
  user: User | null;
  topics: Topic[];
  topicLoading: boolean;
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string | null) => void;
  handleMatchRequest: () => void;
}

function useMatch(): UseMatchReturn {
  const { user } = useAuthStore();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicLoading, setTopicsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    "Easy",
  );

  useEffect(() => {
    fetchTopics()
      .then((res) => {
        const { data } = res;
        setTopics(data);
        if (data.length > 0) setSelectedTopic(data[0]);
      })
      .catch((err) => {
        console.error("fetchTopics failed:", err);
      })
      .finally(() => setTopicsLoading(false));
  }, []);

  function handleMatchRequest() {}

  return {
    user,
    selectedTopic,
    topics,
    topicLoading,
    setSelectedTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    handleMatchRequest,
  };
}

export default useMatch;
