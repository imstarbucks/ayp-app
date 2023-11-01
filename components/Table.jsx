import Spinner from './Spinner';

const Table = ({ data }) => {
  return (
    data && (
      <div className="w-1/2 min-h-[50%] border border-secondary relative">
        {data.loading ? <Spinner /> : <></>}
        {/* <Spinner /> */}
        <div className="grid grid-cols-5 justify-center bg-secondary">
          <div className="p-3">ID</div>
          <div className="p-3">Name</div>
          <div className="p-3">Email</div>
          <div className="p-3">Status</div>
          <div className="p-3">Action</div>
        </div>
      </div>
    )
  );
};

export default Table;
