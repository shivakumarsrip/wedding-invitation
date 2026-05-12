import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface RSVPData {
  id: string;
  name: string;
  guests: string;
  attendance: 'yes' | 'no';
  message: string;
  created_at: string;
}

export const AdminDashboard: React.FC = () => {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchRsvps = async () => {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching RSVPs:", error);
        setError("Failed to fetch RSVPs. You might not have admin permissions.");
      } else {
        setRsvps(data || []);
        setError(null);
      }
    };

    fetchRsvps();

    const channel = supabase
      .channel('public:rsvps')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rsvps' },
        () => {
          fetchRsvps();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in", error);
      setError("Failed to sign in. Please try again.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.attendance === 'yes').length,
    notAttending: rsvps.filter(r => r.attendance === 'no').length,
    totalGuests: rsvps.filter(r => r.attendance === 'yes').reduce((sum, r) => {
      const num = parseInt(r.guests);
      return sum + (isNaN(num) ? 0 : num);
    }, 0)
  };

  if (loading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 max-w-md w-full text-center rounded-3xl"
        >
          <h1 className="text-3xl font-serif text-royal-maroon mb-6">Admin Access</h1>
          <p className="text-royal-maroon/70 mb-8">Please sign in with your authorized admin account to view RSVPs.</p>
          <button 
            onClick={handleLogin}
            className="royal-button w-full flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
          
          <div className="mt-8">
            <Link to="/" className="text-royal-gold hover:text-royal-maroon transition-colors text-sm underline decoration-royal-gold/30 underline-offset-4">
              Return to Invitation
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-royal-maroon/10 pb-8">
          <div>
            <h1 className="text-4xl font-serif text-royal-maroon mb-2">RSVP Dashboard</h1>
            <p className="text-royal-maroon/70">Welcome back, {user.email}</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/" className="text-sm text-royal-gold hover:text-royal-maroon transition-colors">
              View Site
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-royal-maroon/20 text-royal-maroon rounded-lg hover:bg-royal-maroon hover:text-royal-gold transition-all"
            >
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="glass-card bg-sandalwood/20 p-6 rounded-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-royal-maroon/70 mb-2">Total RSVPs</h3>
            <p className="text-4xl font-serif text-royal-maroon">{stats.total}</p>
          </motion.div>
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="glass-card bg-green-50/50 border-green-100 p-6 rounded-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-green-700/70 mb-2">Attending</h3>
            <p className="text-4xl font-serif text-green-800">{stats.attending}</p>
          </motion.div>
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="glass-card bg-royal-gold/10 p-6 rounded-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-royal-maroon/70 mb-2">Est. Guests</h3>
            <p className="text-4xl font-serif text-royal-maroon">{stats.totalGuests}</p>
          </motion.div>
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="glass-card bg-red-50/50 border-red-100 p-6 rounded-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-red-700/70 mb-2">Not Attending</h3>
            <p className="text-4xl font-serif text-red-800">{stats.notAttending}</p>
          </motion.div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden bg-white/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sandalwood/20 border-b border-royal-maroon/10">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-royal-maroon">Guest Name</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-royal-maroon">Party Size</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-royal-maroon">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-royal-maroon">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-royal-maroon">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-royal-maroon/5">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-royal-maroon/50 italic">
                      No RSVPs received yet.
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-royal-maroon">{rsvp.name}</td>
                      <td className="px-6 py-4 text-sm text-royal-maroon/80">{rsvp.guests}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          rsvp.attendance === 'yes' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {rsvp.attendance === 'yes' ? 'Attending' : 'Declined'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-royal-maroon/60">
                        {rsvp.created_at ? new Date(rsvp.created_at).toLocaleDateString() : 'Just now'}
                      </td>
                      <td className="px-6 py-4 text-sm text-royal-maroon/80 max-w-xs truncate" title={rsvp.message}>
                        {rsvp.message || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
