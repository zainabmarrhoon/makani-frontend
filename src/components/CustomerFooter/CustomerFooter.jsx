import { useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams
} from 'react-router';
import {
  getPublicStore,
  getPreviewStore
} from '../../services/storeService';

const CustomerFooter = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const [store, setStore] = useState(null);

  const isPreview = searchParams.get('preview') === 'true';
  const previewStoreId = searchParams.get('storeId');

  useEffect(() => {
    const loadStore = async () => {
      try {
        const data = isPreview && previewStoreId
          ? await getPreviewStore(previewStoreId)
          : await getPublicStore(slug);

        setStore(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadStore();
  }, [slug, isPreview, previewStoreId]);

  if (!store) {
    return null;
  }

  return (
    <footer className="customer-footer">
      <p>
        © {new Date().getFullYear()} {store.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default CustomerFooter;