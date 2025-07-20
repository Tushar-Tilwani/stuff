import React, { useCallback, useEffect, useState } from "react";
type Props = { url?: string };
export type Job = {
  id: string;
  title: string;
};

const PAGE_SIZE = 6;

const ALL_JOBS_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const getJobIdUrl = (id: string) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

async function fetchData<T>(url: string) {
  const response = await fetch(url);
  const data: T = await response.json();
  return data;
}

const useGetJobBoard = () => {
  const [jobIds, setJobIds] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobIds = async () => {
      const jobIds = await fetchData<string[]>(ALL_JOBS_URL);
      setJobIds(jobIds);
      setPageNumber(1);
    };
    fetchJobIds();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      if (pageNumber > 0) {
        const currentJobIds = jobIds.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
        const jobs = await Promise.all(
          currentJobIds.map((currentJobIds) => fetchData<Job>(getJobIdUrl(currentJobIds)))
        );
        setJobs((prev) => [...prev, ...jobs]);
      }
    };
    fetchJobs();
  }, [pageNumber]);

  const loadMoreJobs = useCallback(() => {
    setPageNumber((pageNumber) => pageNumber + 1);
  }, [setPageNumber]);

  return { jobs, loadMoreJobs };
};

const JobBoard: React.FC<Props> = () => {
  const { jobs, loadMoreJobs } = useGetJobBoard();

  return (
    <h1>
      <div>
        {jobs.map((job) => {
          return (
            <p key={job.id}>
              <b>{job.title}</b>
            </p>
          );
        })}
      </div>
      <button onClick={loadMoreJobs}>Load More Jobs</button>
    </h1>
  );
};

export default JobBoard;
