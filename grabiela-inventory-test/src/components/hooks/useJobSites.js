import { useMemo } from 'react';
import { useStore } from '../../context/InventoryStore';

export default function useJobSites(search = '', filter = 'all') {
    const { jobsites } = useStore();
    const filtered = useMemo(() => {
        return jobsites.filter(job => {
            const matchesSearch = job.name.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = filter === 'all' || job.status === filter;
            return matchesSearch && matchesStatus;
        });
    }, [jobsites, search, filter]);

    return {
        jobsites: filtered,
        counts: {
            'On Road': jobsites.filter(j => j.status === 'On Road').length,
            'Completed': jobsites.filter(j => j.status === 'Completed').length,
            'On Hold': jobsites.filter(j => j.status === 'On Hold').length,
        }
    };
}
