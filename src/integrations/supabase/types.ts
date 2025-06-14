export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievement_votes: {
        Row: {
          achievement_id: string
          created_at: string | null
          user_id: string
          vote_type: string
        }
        Insert: {
          achievement_id: string
          created_at?: string | null
          user_id: string
          vote_type: string
        }
        Update: {
          achievement_id?: string
          created_at?: string | null
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievement_votes_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "weekly_achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tool_chat: {
        Row: {
          chat_history: Json | null
          created_at: string | null
          employer_id: string
          id: string
          updated_at: string | null
        }
        Insert: {
          chat_history?: Json | null
          created_at?: string | null
          employer_id: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          chat_history?: Json | null
          created_at?: string | null
          employer_id?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tool_chat_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tool_job_matches: {
        Row: {
          ai_tool_id: string | null
          created_at: string | null
          gemini_reasoning: string | null
          id: string
          job_post_id: string | null
          match_metadata: Json | null
          similarity_score: number
          source: string
        }
        Insert: {
          ai_tool_id?: string | null
          created_at?: string | null
          gemini_reasoning?: string | null
          id?: string
          job_post_id?: string | null
          match_metadata?: Json | null
          similarity_score: number
          source?: string
        }
        Update: {
          ai_tool_id?: string | null
          created_at?: string | null
          gemini_reasoning?: string | null
          id?: string
          job_post_id?: string | null
          match_metadata?: Json | null
          similarity_score?: number
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_tool_matches_ai_tool_id_fkey"
            columns: ["ai_tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_tool_matches_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tools: {
        Row: {
          created_at: string
          embedding: string | null
          enterprise_security_readiness: string | null
          focus_category: string | null
          function: string | null
          id: string
          integrations: string | null
          key_features: string | null
          known_customers: string | null
          name: string | null
          official_website: string | null
          price: string | null
        }
        Insert: {
          created_at?: string
          embedding?: string | null
          enterprise_security_readiness?: string | null
          focus_category?: string | null
          function?: string | null
          id?: string
          integrations?: string | null
          key_features?: string | null
          known_customers?: string | null
          name?: string | null
          official_website?: string | null
          price?: string | null
        }
        Update: {
          created_at?: string
          embedding?: string | null
          enterprise_security_readiness?: string | null
          focus_category?: string | null
          function?: string | null
          id?: string
          integrations?: string | null
          key_features?: string | null
          known_customers?: string | null
          name?: string | null
          official_website?: string | null
          price?: string | null
        }
        Relationships: []
      }
      alembic_version: {
        Row: {
          version_num: string
        }
        Insert: {
          version_num: string
        }
        Update: {
          version_num?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          application_data: Json | null
          created_at: string | null
          developer_id: string
          employer_id: string
          id: string
          job_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          application_data?: Json | null
          created_at?: string | null
          developer_id: string
          employer_id: string
          id?: string
          job_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          application_data?: Json | null
          created_at?: string | null
          developer_id?: string
          employer_id?: string
          id?: string
          job_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      commit_changes: {
        Row: {
          additions: number | null
          changes: string | null
          commit_id: string
          created_at: string | null
          deletions: number | null
          filename: string
          id: string
          repo_id: string
        }
        Insert: {
          additions?: number | null
          changes?: string | null
          commit_id: string
          created_at?: string | null
          deletions?: number | null
          filename: string
          id?: string
          repo_id: string
        }
        Update: {
          additions?: number | null
          changes?: string | null
          commit_id?: string
          created_at?: string | null
          deletions?: number | null
          filename?: string
          id?: string
          repo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commit_changes_commit_id_fkey"
            columns: ["commit_id"]
            isOneToOne: false
            referencedRelation: "commits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commit_changes_repo_id_fkey"
            columns: ["repo_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      commits: {
        Row: {
          embedding: string | null
          id: string
          message: string
          repo_id: string
          timestamp: string | null
        }
        Insert: {
          embedding?: string | null
          id?: string
          message: string
          repo_id: string
          timestamp?: string | null
        }
        Update: {
          embedding?: string | null
          id?: string
          message?: string
          repo_id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commits_repo_id_fkey"
            columns: ["repo_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          cover_url: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_verified: boolean | null
          member_count: number | null
          name: string
          post_count: number | null
          slug: string
          tags: string[] | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_verified?: boolean | null
          member_count?: number | null
          name: string
          post_count?: number | null
          slug: string
          tags?: string[] | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_verified?: boolean | null
          member_count?: number | null
          name?: string
          post_count?: number | null
          slug?: string
          tags?: string[] | null
        }
        Relationships: []
      }
      community_comment_likes: {
        Row: {
          comment_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "community_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      community_comments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          parent_id: string | null
          post_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          parent_id?: string | null
          post_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          parent_id?: string | null
          post_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "community_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string
          joined_at: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          joined_at?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_likes: {
        Row: {
          created_at: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_id: string | null
          comments_count: number | null
          community_id: string | null
          content: string | null
          created_at: string | null
          id: string
          likes_count: number | null
          post_type: Database["public"]["Enums"]["community_post_type"]
          tags: string[] | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          author_id?: string | null
          comments_count?: number | null
          community_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          likes_count?: number | null
          post_type: Database["public"]["Enums"]["community_post_type"]
          tags?: string[] | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          author_id?: string | null
          comments_count?: number | null
          community_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          likes_count?: number | null
          post_type?: Database["public"]["Enums"]["community_post_type"]
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      company_analyses: {
        Row: {
          analysis_data: Json | null
          analysis_metadata: Json | null
          analysis_type: string
          created_at: string | null
          employer_id: string
          id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          analysis_data?: Json | null
          analysis_metadata?: Json | null
          analysis_type?: string
          created_at?: string | null
          employer_id: string
          id?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          analysis_data?: Json | null
          analysis_metadata?: Json | null
          analysis_type?: string
          created_at?: string | null
          employer_id?: string
          id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_company_analyses_employer_id"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          reference_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id: string
          reference_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_credit_transactions_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credits_ledger_table: {
        Row: {
          credits: number
          feature_id: number | null
          id: number
          log: string | null
          reason: string
          remaining_credits_after_transaction: number
          time_created: string | null
          transaction_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          credits: number
          feature_id?: number | null
          id?: number
          log?: string | null
          reason: string
          remaining_credits_after_transaction: number
          time_created?: string | null
          transaction_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          credits?: number
          feature_id?: number | null
          id?: number
          log?: string | null
          reason?: string
          remaining_credits_after_transaction?: number
          time_created?: string | null
          transaction_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credits_ledger_table_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features_table"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_ledger_table_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_credits_ledger_transaction"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "credit_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_requests: {
        Row: {
          company_name: string | null
          company_website: string | null
          created_at: string
          employee_size: string | null
          id: string
          name: string | null
          work_email: string | null
        }
        Insert: {
          company_name?: string | null
          company_website?: string | null
          created_at?: string
          employee_size?: string | null
          id?: string
          name?: string | null
          work_email?: string | null
        }
        Update: {
          company_name?: string | null
          company_website?: string | null
          created_at?: string
          employee_size?: string | null
          id?: string
          name?: string | null
          work_email?: string | null
        }
        Relationships: []
      }
      developer_analysis_by_employer: {
        Row: {
          created_at: string
          employer_id: string
          external_developer_id: string | null
          github_username: string
          id: string
          is_deleted: boolean
          is_saved_to_company: boolean | null
          status: string
        }
        Insert: {
          created_at?: string
          employer_id: string
          external_developer_id?: string | null
          github_username: string
          id?: string
          is_deleted?: boolean
          is_saved_to_company?: boolean | null
          status: string
        }
        Update: {
          created_at?: string
          employer_id?: string
          external_developer_id?: string | null
          github_username?: string
          id?: string
          is_deleted?: boolean
          is_saved_to_company?: boolean | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "developer_analysis_by_employer_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "developer_analysis_by_employer_external_developer_id_fkey"
            columns: ["external_developer_id"]
            isOneToOne: false
            referencedRelation: "external_developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "developer_analysis_by_employer_external_developer_id_fkey1"
            columns: ["external_developer_id"]
            isOneToOne: false
            referencedRelation: "external_developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_employer"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      developer_embeddings: {
        Row: {
          developer_id: string | null
          embedding: string | null
          external_developer_id: string | null
          id: string
          stats: Json | null
        }
        Insert: {
          developer_id?: string | null
          embedding?: string | null
          external_developer_id?: string | null
          id?: string
          stats?: Json | null
        }
        Update: {
          developer_id?: string | null
          embedding?: string | null
          external_developer_id?: string | null
          id?: string
          stats?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "developer_embeddings_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_embeddings_external_developer"
            columns: ["external_developer_id"]
            isOneToOne: false
            referencedRelation: "external_developers"
            referencedColumns: ["id"]
          },
        ]
      }
      developers: {
        Row: {
          current_position: string | null
          email: string | null
          github_username: string | null
          id: string
          name: string | null
          preferred_location: Json | null
          profile_stats: Json | null
          signup_date: string | null
          stats: Json | null
          visibility: string | null
          years_of_experience: string | null
        }
        Insert: {
          current_position?: string | null
          email?: string | null
          github_username?: string | null
          id?: string
          name?: string | null
          preferred_location?: Json | null
          profile_stats?: Json | null
          signup_date?: string | null
          stats?: Json | null
          visibility?: string | null
          years_of_experience?: string | null
        }
        Update: {
          current_position?: string | null
          email?: string | null
          github_username?: string | null
          id?: string
          name?: string | null
          preferred_location?: Json | null
          profile_stats?: Json | null
          signup_date?: string | null
          stats?: Json | null
          visibility?: string | null
          years_of_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "developers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_chat_for_job: {
        Row: {
          chat_history: Json | null
          created_at: string
          employer_id: string
          id: string
          job_id: string
          updated_at: string
        }
        Insert: {
          chat_history?: Json | null
          created_at?: string
          employer_id: string
          id?: string
          job_id: string
          updated_at?: string
        }
        Update: {
          chat_history?: Json | null
          created_at?: string
          employer_id?: string
          id?: string
          job_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_chat_for_job_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_chat_for_job_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      employers: {
        Row: {
          company_name: string
          company_profile: Json | null
          company_website: string | null
          email: string
          id: string
          signup_date: string | null
        }
        Insert: {
          company_name: string
          company_profile?: Json | null
          company_website?: string | null
          email: string
          id?: string
          signup_date?: string | null
        }
        Update: {
          company_name?: string
          company_profile?: Json | null
          company_website?: string | null
          email?: string
          id?: string
          signup_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      external_developers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_position: string | null
          email: string | null
          github_username: string | null
          id: string
          location: string | null
          name: string | null
          stats: Json | null
          visibility: string | null
          years_of_experience: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_position?: string | null
          email?: string | null
          github_username?: string | null
          id?: string
          location?: string | null
          name?: string | null
          stats?: Json | null
          visibility?: string | null
          years_of_experience?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_position?: string | null
          email?: string | null
          github_username?: string | null
          id?: string
          location?: string | null
          name?: string | null
          stats?: Json | null
          visibility?: string | null
          years_of_experience?: string | null
        }
        Relationships: []
      }
      features_table: {
        Row: {
          credit_cost: number
          description: string | null
          id: number
          name: string
          time_created: string | null
          time_updated: string | null
        }
        Insert: {
          credit_cost: number
          description?: string | null
          id?: number
          name: string
          time_created?: string | null
          time_updated?: string | null
        }
        Update: {
          credit_cost?: number
          description?: string | null
          id?: number
          name?: string
          time_created?: string | null
          time_updated?: string | null
        }
        Relationships: []
      }
      feed_runs: {
        Row: {
          created_at: string | null
          error_message: string | null
          feed_id: string
          id: string
          item_count: number
          items: Json | null
          logs: Json | null
          owner_id: string
          processed_at: string | null
          scheduled_to: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          feed_id: string
          id: string
          item_count: number
          items?: Json | null
          logs?: Json | null
          owner_id: string
          processed_at?: string | null
          scheduled_to?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          feed_id?: string
          id?: string
          item_count?: number
          items?: Json | null
          logs?: Json | null
          owner_id?: string
          processed_at?: string | null
          scheduled_to?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feed_runs_feed_id_fkey"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "feeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_feed_runs_owner_id_employers"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      feeds: {
        Row: {
          cancelled_at: string | null
          category: string | null
          created_at: string | null
          custom_query: string | null
          frequency: string
          id: string
          is_active: boolean | null
          last_run_at: string | null
          next_run_at: string | null
          owner_id: string
          subcategory: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          cancelled_at?: string | null
          category?: string | null
          created_at?: string | null
          custom_query?: string | null
          frequency: string
          id: string
          is_active?: boolean | null
          last_run_at?: string | null
          next_run_at?: string | null
          owner_id: string
          subcategory?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          cancelled_at?: string | null
          category?: string | null
          created_at?: string | null
          custom_query?: string | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          next_run_at?: string | null
          owner_id?: string
          subcategory?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feeds_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      job_developer_match_analyses: {
        Row: {
          analysis: Json
          areas_of_improvement: Json | null
          created_at: string | null
          developer_id: string
          id: string
          job_id: string
          match_score: number
          recommendation: string
          strengths: Json | null
        }
        Insert: {
          analysis: Json
          areas_of_improvement?: Json | null
          created_at?: string | null
          developer_id: string
          id?: string
          job_id: string
          match_score: number
          recommendation: string
          strengths?: Json | null
        }
        Update: {
          analysis?: Json
          areas_of_improvement?: Json | null
          created_at?: string | null
          developer_id?: string
          id?: string
          job_id?: string
          match_score?: number
          recommendation?: string
          strengths?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "job_developer_match_analyses_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_developer_match_analyses_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      job_matches: {
        Row: {
          created_at: string | null
          developer_id: string | null
          embedding_similarity_score: number | null
          experience_match_score: number | null
          external_developer_id: string | null
          id: string
          job_id: string
          location_match_score: number | null
          match_score: number
          profile_match: number | null
          role_match_score: number | null
          score_details: Json | null
          skills_match: number | null
          skills_match_score: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          developer_id?: string | null
          embedding_similarity_score?: number | null
          experience_match_score?: number | null
          external_developer_id?: string | null
          id?: string
          job_id: string
          location_match_score?: number | null
          match_score: number
          profile_match?: number | null
          role_match_score?: number | null
          score_details?: Json | null
          skills_match?: number | null
          skills_match_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          developer_id?: string | null
          embedding_similarity_score?: number | null
          experience_match_score?: number | null
          external_developer_id?: string | null
          id?: string
          job_id?: string
          location_match_score?: number | null
          match_score?: number
          profile_match?: number | null
          role_match_score?: number | null
          score_details?: Json | null
          skills_match?: number | null
          skills_match_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_matches_external_developer_id_fkey"
            columns: ["external_developer_id"]
            isOneToOne: false
            referencedRelation: "external_developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      job_placements: {
        Row: {
          application_id: string | null
          developer_id: string
          employer_id: string
          feedback: Json | null
          id: string
          job_id: string
          placement_date: string | null
          salary_range: string | null
        }
        Insert: {
          application_id?: string | null
          developer_id: string
          employer_id: string
          feedback?: Json | null
          id?: string
          job_id: string
          placement_date?: string | null
          salary_range?: string | null
        }
        Update: {
          application_id?: string | null
          developer_id?: string
          employer_id?: string
          feedback?: Json | null
          id?: string
          job_id?: string
          placement_date?: string | null
          salary_range?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_placements_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_placements_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_placements_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_placements_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      job_posts: {
        Row: {
          created_at: string | null
          embedding: string | null
          employer_id: string
          form_data: Json | null
          id: string
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          employer_id: string
          form_data?: Json | null
          id?: string
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          employer_id?: string
          form_data?: Json | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_posts_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          feedback_metadata: Json | null
          feedback_type: string
          id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          feedback_metadata?: Json | null
          feedback_type: string
          id?: string
          rating?: number | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          feedback_metadata?: Json | null
          feedback_type?: string
          id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
      platform_metrics: {
        Row: {
          date: string | null
          id: string
          metric_metadata: Json | null
          metric_type: string
          value: number | null
        }
        Insert: {
          date?: string | null
          id?: string
          metric_metadata?: Json | null
          metric_type: string
          value?: number | null
        }
        Update: {
          date?: string | null
          id?: string
          metric_metadata?: Json | null
          metric_type?: string
          value?: number | null
        }
        Relationships: []
      }
      pr_changes: {
        Row: {
          additions: number | null
          changes: string | null
          created_at: string | null
          deletions: number | null
          filename: string
          id: string
          pr_id: string
          repo_id: string
        }
        Insert: {
          additions?: number | null
          changes?: string | null
          created_at?: string | null
          deletions?: number | null
          filename: string
          id?: string
          pr_id: string
          repo_id: string
        }
        Update: {
          additions?: number | null
          changes?: string | null
          created_at?: string | null
          deletions?: number | null
          filename?: string
          id?: string
          pr_id?: string
          repo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pr_changes_pr_id_fkey"
            columns: ["pr_id"]
            isOneToOne: false
            referencedRelation: "pull_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pr_changes_repo_id_fkey"
            columns: ["repo_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      process_queue: {
        Row: {
          created_at: string
          feed_run_id: string | null
          id: string
          logs: Json | null
          priority: string | null
          process_type: string | null
          props: Json | null
          scheduled_to: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          feed_run_id?: string | null
          id?: string
          logs?: Json | null
          priority?: string | null
          process_type?: string | null
          props?: Json | null
          scheduled_to?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          feed_run_id?: string | null
          id?: string
          logs?: Json | null
          priority?: string | null
          process_type?: string | null
          props?: Json | null
          scheduled_to?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_process_queue_feed_run_id"
            columns: ["feed_run_id"]
            isOneToOne: false
            referencedRelation: "feed_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_views: {
        Row: {
          id: number
          profile_owner_id: string
          view_metadata: Json | null
          viewed_at: string | null
          viewer_id: string | null
        }
        Insert: {
          id?: number
          profile_owner_id: string
          view_metadata?: Json | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Update: {
          id?: number
          profile_owner_id?: string
          view_metadata?: Json | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profile_owner"
            columns: ["profile_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_viewer"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          cover_url: string | null
          credits: number | null
          deleted_at: string | null
          email: string | null
          full_name: string | null
          github_access_given_date: string | null
          github_username: string | null
          id: string
          is_active: boolean | null
          is_admin: boolean | null
          is_company: boolean | null
          is_developer: boolean | null
          notification_preferences: Json | null
          onboarding_completed: boolean | null
          skills: string[] | null
          slug: string | null
          title: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          cover_url?: string | null
          credits?: number | null
          deleted_at?: string | null
          email?: string | null
          full_name?: string | null
          github_access_given_date?: string | null
          github_username?: string | null
          id: string
          is_active?: boolean | null
          is_admin?: boolean | null
          is_company?: boolean | null
          is_developer?: boolean | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          skills?: string[] | null
          slug?: string | null
          title?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          cover_url?: string | null
          credits?: number | null
          deleted_at?: string | null
          email?: string | null
          full_name?: string | null
          github_access_given_date?: string | null
          github_username?: string | null
          id?: string
          is_active?: boolean | null
          is_admin?: boolean | null
          is_company?: boolean | null
          is_developer?: boolean | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          skills?: string[] | null
          slug?: string | null
          title?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      pull_requests: {
        Row: {
          created_at: string | null
          description: string | null
          embedding: string | null
          id: string
          repo_id: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          repo_id: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          repo_id?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "pull_requests_repo_id_fkey"
            columns: ["repo_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      repositories: {
        Row: {
          created_at: string | null
          developer_id: string | null
          external_developer_id: string | null
          id: string
          link: string
          name: string
          repository_insights: Json | null
          repository_scores: Json | null
          repository_stats: Json | null
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          developer_id?: string | null
          external_developer_id?: string | null
          id?: string
          link: string
          name: string
          repository_insights?: Json | null
          repository_scores?: Json | null
          repository_stats?: Json | null
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          developer_id?: string | null
          external_developer_id?: string | null
          id?: string
          link?: string
          name?: string
          repository_insights?: Json | null
          repository_scores?: Json | null
          repository_stats?: Json | null
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_repositories_external_developer"
            columns: ["external_developer_id"]
            isOneToOne: false
            referencedRelation: "external_developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repositories_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
        ]
      }
      team_analysis_chat: {
        Row: {
          chat_history: Json | null
          created_at: string
          employer_id: string
          id: string
          updated_at: string
        }
        Insert: {
          chat_history?: Json | null
          created_at?: string
          employer_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          chat_history?: Json | null
          created_at?: string
          employer_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_team_analysis_chat_employer"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_achievements: {
        Row: {
          content: string
          created_at: string | null
          downvotes: number | null
          id: string
          upvotes: number | null
          user_id: string
          week_number: number
          year: number
        }
        Insert: {
          content: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          upvotes?: number | null
          user_id: string
          week_number: number
          year: number
        }
        Update: {
          content?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          upvotes?: number | null
          user_id?: string
          week_number?: number
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      community_post_type: "announcement" | "link" | "question" | "discussion"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      community_post_type: ["announcement", "link", "question", "discussion"],
    },
  },
} as const
