

const IpInfo = ({ ipData }) => {
  return (
    <div className="header__box">
      <div className="header__ip-info">
        <div className="header__ip-title">IP Address</div>
        <span className="header__ip-result">{ipData?.ip || '--'}</span>
      </div>
      <div className="header__ip-info">
        <div className="header__ip-title">Location</div>
        <span className="header__ip-result">{ipData?.location?.city || '--'}</span>
      </div>
      <div className="header__ip-info">
        <div className="header__ip-title">Timezone</div>
        <span className="header__ip-result">UTC {ipData?.location?.timezone || '--'}</span>
      </div>
      <div className="header__ip-info">
        <div className="header__ip-title">ISP</div>
        <span className="header__ip-result">{ipData?.isp || '--'}</span>
      </div>
    </div>
  );
};

export default IpInfo;
