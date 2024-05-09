interface IJobProfileFeature {
  id: number;
  role_similarity: number;
  company_similarity: number;
  role_similarity_note: string;
  company_similarity_note: string;
  created_at: string;
  updated_at: string;
  job_id: number;
  job_entity_id: number;
  profile_id: number;
}
