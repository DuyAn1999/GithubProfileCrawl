"use client";
import Image from 'next/image'
import { type } from 'os';
import { useState, useEffect } from 'react';

type GitHubProfileInfoType = GithubUserInfo & {
  id: Number,
  name: string,
  url: string,
  blog: string,
  bio: string,
  location: string,
  public_repos: Number,
}

type GithubUserInfo = {
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean
}

type RepoInfo = {
  id: Number,
  node_id: string,
  name: string,
  full_name: string,
  private: boolean,
  owner: GithubUserInfo,
  html_url: string,
  description: string,
  fork: boolean,
  url: string,
  forks_url: string,
  keys_url: string,
  collaborators_url: string,
  teams_url: string,
  hooks_url: string,
  issue_events_url: string,
  events_url: string,
  assignees_url: string,
  branches_url: string,
  tags_url: string,
  blobs_url: string,
  git_tags_url: string,
  git_refs_url: string,
  trees_url: string,
  statuses_url: string,
  languages_url: string,
  stargazers_url: string,  
  contributors_url: string,
  subscribers_url: string,
  subscription_url: string,
  commits_url: string,
  git_commits_url: string,
  comments_url: string,
  issue_comment_url: string,
  contents_url: string,
  compare_url: string,
  merges_url: string,
  archive_url: string,
  downloads_url: string,
  issues_url: string,
  pulls_url: string,
  milestones_url: string,
  notifications_url: string,
  labels_url: string,
  releases_url: string,
  deployments_url: string,
  created_at: string,
  updated_at: string,
  pushed_at: string,
  git_url: string,
  ssh_url: string,
  clone_url: string,
  svn_url: string,
  homepage: string,
  size: Number,
  stargazers_count: Number,
  watchers_count: Number,
  language: string,
  has_issues: boolean,
  has_projects: boolean,
  has_downloads: boolean,
  has_wiki: boolean,
  has_pages: boolean,
  has_discussions: boolean,
  forks_count: Number,
  mirror_url: string,
  archived: boolean,
  disabled: boolean,
  open_issues_count: Number,
  license: string,
  allow_forking: boolean,
  is_template: boolean,
  web_commit_signoff_required: boolean,
  topics: string[],
  visibility: string,
  forks: Number,
  open_issues: Number,
  watchers: Number,
  default_branch: string
}

export default function Home() {
  const [userName, setUserName] =  useState('');
  const [profileInfo, setProfileInfo] =  useState<GitHubProfileInfoType>({});
  const fetchUSerProfileInfo = async (userName: string) => {
    try {
      const res = await fetch(`https://api.github.com/users/${userName}`);
      const data = res.json();
      setProfileInfo(await data);
    }
    catch(e){
      console.log(e)
    }
  }

  const fetchRepos = async () => {
    try {
      console.log(profileInfo)
      const res = await fetch(profileInfo.repos_url);
      const data = res.json();
      console.log(await data);
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchRepos();
  }, [profileInfo])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='container'>
        <div className='search-container flex flex-col'>
          <input className='search-input justify-center' value={userName} onChange={(e) => {setUserName(e.target.value)}}>
          </input>
          <button className='search-btn justify-center' onClick={async () => await fetchUSerProfileInfo(userName)}>Search</button>
        </div>

        {!profileInfo ||
        (<div className='profileInfo'>
          <img src={profileInfo.avatar_url}></img>
          <div>
            Profile name: {profileInfo.name}
          </div>
          <div>
            Profile link: {profileInfo.url}
          </div>
          <div>
            Repos: 
            {}
          </div>
        </div>)
}
      </div>
    </main>
  )
}
