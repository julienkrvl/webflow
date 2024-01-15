const ads = async () => {
  var url = "https://api.reversecontact.com/users/ads/get_visitor_id";
              const settings = {
                method: 'POST',
                headers: {},
                body: JSON.stringify({
                  "uuid": Math.random().toString(36).substring(2, 36)
                })
              };

              const response = await fetch(url, settings);
              const json = await response.json();
              var adsInp = document.createElement("input");
  						adsInp.type = "hidden";
  						adsInp.value = json.ads_visitor_id;
  						adsInp.id = "ads_pixel";
							document.body.appendChild(adsInp);
              
}
ads()
