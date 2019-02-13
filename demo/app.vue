<template>
  <div id="app">

    <div class="wrapper">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae mattis augue. Aenean eget quam vel ante fringilla hendrerit. Integer id magna nec ex sodales gravida vitae id mi. Cras efficitur posuere ante, id mollis ligula dignissim a. Suspendisse volutpat laoreet felis. Ut eu elementum urna. Suspendisse molestie purus non viverra rhoncus. Praesent et enim et tellus convallis fringilla. Aliquam leo metus, commodo nec lectus vel, ultricies venenatis mauris. Cras luctus facilisis ante at eleifend. Cras ante felis, dictum eu magna sed, viverra malesuada mauris. Nullam a magna dignissim, euismod sapien sed, dictum sem. Etiam fringilla ipsum at volutpat euismod.</p>
      <p>In lorem lacus, venenatis a nisi id, mollis hendrerit elit. Duis at diam eget mauris semper semper. Integer vel varius neque, non rhoncus dolor. Suspendisse sagittis scelerisque ante. Maecenas dapibus elit quis dui pharetra, vitae lobortis odio volutpat. Maecenas in nulla quam. Ut non convallis odio, vitae bibendum diam. In pharetra felis vel lobortis ultricies. Cras pulvinar elit ante, in rutrum enim rutrum luctus. Pellentesque sed purus venenatis, euismod nibh vitae, maximus enim. Donec hendrerit tristique augue, et mollis lacus condimentum id. Aliquam erat volutpat. Donec at aliquam nisi, sit amet ultricies nisl. Integer sit amet consectetur ipsum.</p>
      <p>Aliquam consequat erat ut mauris posuere malesuada. Curabitur ac ipsum dictum, facilisis neque vel, aliquam nisl. Mauris pulvinar ex elit, auctor varius erat auctor at. Nulla iaculis gravida metus ut blandit. Sed pulvinar mauris iaculis est viverra ultricies. Integer eget fringilla libero. Donec ut pretium nunc. Suspendisse at turpis mi. Mauris et erat vehicula, rhoncus ante eget, viverra velit. Integer at imperdiet urna.</p>
      <p>Quisque vestibulum quis diam non mollis. Vivamus a augue justo. Phasellus a nulla tempus, mollis mi eget, convallis leo. Nam eros sapien, ultrices sit amet gravida a, vulputate quis sem. Nullam vulputate orci ante, ut malesuada sem maximus nec. Etiam euismod eros ac dui bibendum ultricies. Nam ullamcorper, lacus quis posuere egestas, libero lorem mollis leo, ac semper est augue pellentesque diam. Sed porta justo quis velit varius ullamcorper sit amet quis leo. Nam viverra fringilla imperdiet. Cras tincidunt justo vel neque euismod malesuada. Sed suscipit quis enim nec tincidunt. Fusce at ullamcorper dolor.</p>
      <p>Nunc mauris lorem, porttitor at massa a, viverra ullamcorper lectus. Vivamus mi lacus, tincidunt in leo sed, interdum interdum nunc. Cras ac porttitor neque, pretium finibus massa. Proin in ultrices est. Etiam nisi neque, tempor et facilisis sit amet, finibus in libero. Cras pulvinar ex et placerat auctor. Cras tristique ex odio, ac convallis felis mattis quis. Sed faucibus nunc et vehicula finibus.</p>
      <p>Fusce nisi turpis, porttitor in accumsan eget, molestie quis arcu. Duis ut ante ipsum. Proin condimentum dictum enim non eleifend. Vivamus in sagittis libero. In urna erat, fringilla vel ligula sit amet, bibendum rhoncus erat. Vivamus mollis laoreet ex, sed fringilla est dignissim a. Aenean congue at leo vel fringilla. Etiam bibendum volutpat ante. Duis in nibh vel lectus egestas sagittis. Donec consectetur ornare massa, eu ultricies metus auctor laoreet. Duis interdum dui ut odio finibus, quis bibendum dui volutpat. Duis et justo sed mi feugiat pretium nec ac lectus. Maecenas consectetur nisi eget sapien egestas imperdiet. Fusce gravida mollis nulla in efficitur. Duis consequat vulputate est id lobortis.</p>
      <p>Nunc commodo varius pulvinar. Aliquam egestas vehicula tincidunt. In hac habitasse platea dictumst. Vestibulum viverra nibh vel posuere volutpat. Aenean dui enim, congue et imperdiet ut, ultricies quis enim. Nullam sagittis urna libero, id porttitor nisi auctor non. Aenean eu mattis velit. In eu nunc eget ligula eleifend aliquam ac a quam.</p>

      <div class="example">
        <h1>Base Example (no custom css, js, or markup)</h1>
        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_custom_country}}</p>
          <label class="input-label">Choose A Country</label>
          <v-select :options="countries" placeholder="Select a State..." v-model="selected_custom_country"></v-select>
        </div>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_native_country}}</p>
          <label class="input-label">Choose A Country</label>
          <select v-model="selected_native_country">
            <option value="AF" disabled="">Afghanistan</option>
            <option value="AX" disabled="">Åland Islands</option>
            <option value="AL" disabled="">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AQ">Antarctica</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia, Plurinational State of</option>
            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BV">Bouvet Island</option>
            <option value="BR">Brazil</option>
            <option value="IO">British Indian Ocean Territory</option>
            <option value="BN">Brunei Darussalam</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CV">Cape Verde</option>
            <option value="KY">Cayman Islands</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CX">Christmas Island</option>
            <option value="CC">Cocos (Keeling) Islands</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CG">Congo</option>
            <option value="CD">Congo, the Democratic Republic of the</option>
            <option value="CK">Cook Islands</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CW">Curaçao</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FK">Falkland Islands (Malvinas)</option>
            <option value="FO">Faroe Islands</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GF">French Guiana</option>
            <option value="PF">French Polynesia</option>
            <option value="TF">French Southern Territories</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Greece</option>
            <option value="GL">Greenland</option>
            <option value="GD">Grenada</option>
            <option value="GP">Guadeloupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GG">Guernsey</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HM">Heard Island and McDonald Islands</option>
            <option value="VA">Holy See (Vatican City State)</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran, Islamic Republic of</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IM">Isle of Man</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JE">Jersey</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="KP">Korea, Democratic People's Republic of</option>
            <option value="KR">Korea, Republic of</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Lao People's Democratic Republic</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MO">Macao</option>
            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MQ">Martinique</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="YT">Mayotte</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia, Federated States of</option>
            <option value="MD">Moldova, Republic of</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="NC">New Caledonia</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NU">Niue</option>
            <option value="NF">Norfolk Island</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PS">Palestinian Territory, Occupied</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PN">Pitcairn</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="RE">Réunion</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="RW">Rwanda</option>
            <option value="BL">Saint Barthélemy</option>
            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="LC">Saint Lucia</option>
            <option value="MF">Saint Martin (French part)</option>
            <option value="PM">Saint Pierre and Miquelon</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SX">Sint Maarten (Dutch part)</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="SB">Solomon Islands</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="GS">South Georgia and the South Sandwich Islands</option>
            <option value="SS">South Sudan</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard and Jan Mayen</option>
            <option value="SZ">Swaziland</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TJ">Tajikistan</option>
            <option value="TZ">Tanzania, United Republic of</option>
            <option value="TH">Thailand</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TK">Tokelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="TM">Turkmenistan</option>
            <option value="TC">Turks and Caicos Islands</option>
            <option value="TV">Tuvalu</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UM">United States Minor Outlying Islands</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela, Bolivarian Republic of</option>
            <option value="VN">Viet Nam</option>
            <option value="VG">Virgin Islands, British</option>
            <option value="VI">Virgin Islands, U.S.</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="EH">Western Sahara</option>
            <option value="YE">Yemen</option>
            <option value="ZM" disabled="">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </select>
        </div>
      </div>

      <div class="example">
        <h1>Extended option component, to add images</h1>
        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_custom_state}}</p>
          <label class="input-label">Choose A State</label>
          <v-select :options="states" :option="state_option" v-model="selected_custom_state"></v-select>
        </div>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_native_state}}</p>
          <label class="input-label">Choose A State</label>
          <select v-model="selected_native_state">
            <option value="AL" disabled>Alabama</option>
            <option value="AK" disabled>Alaska</option>
            <option value="AZ" disabled>Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV" disabled>West Virginia</option>
            <option value="WI" disabled>Wisconsin</option>
            <option value="WY" disabled>Wyoming</option>
          </select>
        </div>
      </div>

      <div class="example">
        <h1>Extended select component, to modify open/close animation</h1>
        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_custom_cocktail}}</p>
          <label class="input-label">Choose A Cocktail</label>
          <v-fancy :options="cocktails" :size="200" v-model="selected_custom_cocktail"></v-fancy>
        </div>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_native_cocktail}}</p>
          <label class="input-label">Choose A Cocktail</label>
          <select v-model="selected_native_cocktail">
            <optgroup label="Rum">
              <option value="Blue Hawaii">Blue Hawaii</option>
              <option value="Brass Monkey">Brass Monkey</option>
              <option value="Bumbo">Bumbo</option>
              <option value="Bushwacker">Bushwacker</option>
              <option value="Caribou Lou">Caribou Lou</option>
              <option value="Cojito">Cojito</option>
              <option value="Cremat">Cremat</option>
              <option value="Cuba Libre">Cuba Libre</option>
              <option value="Cuban Sunset">Cuban Sunset</option>
              <option value="Daiquiri">Daiquiri</option>
              <option value="Dark 'N' Stormy">Dark 'N' Stormy</option>
              <option value="El Presidente">El Presidente</option>
              <option value="Fish House Punch">Fish House Punch</option>
              <option value="Flaming Dr Pepper">Flaming Dr Pepper</option>
              <option value="Flaming Volcano">Flaming Volcano</option>
              <option value="Fluffy Critter">Fluffy Critter</option>
              <option value="Grog">Grog</option>
              <option value="Gunfire">Gunfire</option>
              <option value="Hot buttered rum">Hot buttered rum</option>
              <option value="Hurricane">Hurricane</option>
              <option value="Jagertee">Jagertee</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Macuá">Macuá</option>
              <option value="Mai-Tai">Mai-Tai</option>
              <option value="Mojito">Mojito</option>
              <option value="Painkiller">Painkiller</option>
              <option value="Piña Colada">Piña Colada</option>
              <option value="Planter's Punch">Planter's Punch</option>
              <option value="Royal Bermuda Cocktail">Royal Bermuda Cocktail</option>
              <option value="Rum Swizzle">Rum Swizzle</option>
              <option value="Ti' Punch">Ti' Punch</option>
              <option value="Tom and Jerry">Tom and Jerry</option>
              <option value="Tschunk">Tschunk</option>
              <option value="Yellow Bird">Yellow Bird</option>
              <option value="Zombie">Zombie</option>
            </optgroup>
            <optgroup label="Tequila">
              <option value="Bloody Aztec">Bloody Aztec</option>
              <option value="Chimayó Cocktail">Chimayó Cocktail</option>
              <option value="El Toro Loco Patron and Redbull">El Toro Loco Patron and Redbull</option>
              <option value="Juan Collins">Juan Collins</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Margarita">Margarita</option>
              <option value="Matador">Matador</option>
              <option value="Paloma">Paloma</option>
              <option value="Slammer Royale">Slammer Royale</option>
              <option value="Tequila Sunrise">Tequila Sunrise</option>
              <option value="Vampiro">Vampiro</option>
            </optgroup>
            <optgroup label="Vodka">
              <option value="Agent Orange">Agent Orange</option>
              <option value="Apple Martini">Apple Martini</option>
              <option value="Astro pop">Astro pop</option>
              <option value="Batida">Batida</option>
              <option value="Bay Breeze">Bay Breeze</option>
              <option value="Blue Lagoon">Blue Lagoon</option>
              <option value="Bull Shot">Bull Shot</option>
              <option value="Caesar">Caesar</option>
              <option value="Caipivodka">Caipivodka</option>
              <option value="Cape Cod">Cape Cod</option>
              <option value="Chi-Chi">Chi-Chi</option>
              <option value="Colombia">Colombia</option>
              <option value="Fizzy apple cocktail">Fizzy apple cocktail</option>
              <option value="Flirtini">Flirtini</option>
              <option value="Gimlet">Gimlet</option>
              <option value="Glowtini">Glowtini</option>
              <option value="Harrogate Nights">Harrogate Nights</option>
              <option value="Hi-fi">Hi-fi</option>
              <option value="Kensington Court Special">Kensington Court Special</option>
              <option value="Kremlin Colonel">Kremlin Colonel</option>
              <option value="Lemon Drop">Lemon Drop</option>
              <option value="Lime Rickey">Lime Rickey</option>
              <option value="Link Up">Link Up</option>
              <option value="Mudslide">Mudslide</option>
              <option value="Orange Tundra">Orange Tundra</option>
              <option value="Paralyzer">Paralyzer</option>
              <option value="Red Lotus">Red Lotus</option>
              <option value="Red Russian">Red Russian</option>
              <option value="Rose Kennedy Cocktail">Rose Kennedy Cocktail</option>
              <option value="Salmiakki Koskenkorva">Salmiakki Koskenkorva</option>
              <option value="Salty Dog">Salty Dog</option>
              <option value="Vodka Gimlet">Vodka Gimlet</option>
              <option value="Vodka Martini">Vodka Martini</option>
              <option value="Vodka McGovern">Vodka McGovern</option>
              <option value="Vodka Sunrise">Vodka Sunrise</option>
              <option value="White Russian">White Russian</option>
            </optgroup>
            <optgroup label="Whisky">
              <option value="Amber Moon">Amber Moon</option>
              <option value="Blue Blazer">Blue Blazer</option>
              <option value="Black Nail">Black Nail</option>
              <option value="Bobby Burns">Bobby Burns</option>
              <option value="Boulevardier">Boulevardier</option>
              <option value="Bourbon Lancer">Bourbon Lancer</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Churchill">Churchill</option>
              <option value="Farnell">Farnell</option>
              <option value="Horsefeather">Horsefeather</option>
              <option value="Jack and Coke">Jack and Coke</option>
              <option value="Jungle Juice">Jungle Juice</option>
              <option value="Lynchburg Lemonade">Lynchburg Lemonade</option>
              <option value="Missouri Mule">Missouri Mule</option>
              <option value="Nixon">Nixon</option>
              <option value="Rob Roy">Rob Roy</option>
              <option value="Scotch and Soda">Scotch and Soda</option>
              <option value="Seven and Seven">Seven and Seven</option>
            </optgroup>
          </select>
        </div>
      </div>
      <p>Etiam velit massa, pharetra eget felis in, venenatis mattis ex. Sed tempor, erat sed interdum bibendum, ex urna gravida sapien, vitae semper eros enim sed turpis. Etiam lacinia cursus tellus, eget imperdiet mi aliquam sit amet. Duis venenatis sapien et elit eleifend, id posuere enim vulputate. Quisque aliquam pretium tellus in efficitur. Etiam pharetra ex id dui bibendum, sit amet convallis lorem aliquet. Etiam varius, arcu a sagittis aliquam, metus enim semper arcu, eu rhoncus tortor lectus a arcu. Integer aliquet porta nibh ac facilisis. Aliquam odio ex, iaculis vel lobortis ut, volutpat et massa. Vestibulum sed congue justo. In scelerisque nec ipsum vel porta. Suspendisse viverra, arcu at ullamcorper fringilla, nibh lacus sollicitudin velit, sed malesuada ligula odio quis augue. Sed sapien urna, imperdiet eget purus et, bibendum pulvinar arcu. In a fermentum ex. Integer in felis sem.</p>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas ornare consequat imperdiet. Cras sed lorem ut erat gravida laoreet ut sagittis sem. Nam tempor, neque vel maximus lobortis, mauris est bibendum metus, nec faucibus purus nisl nec augue. Aenean suscipit tortor mattis tellus dictum feugiat at sed leo. Aliquam facilisis tempus erat eu efficitur. Maecenas ornare augue ac ante lobortis tincidunt. Aliquam nec blandit nunc. Proin malesuada magna ut risus consectetur vulputate. Maecenas vitae mollis augue. Pellentesque accumsan enim imperdiet tellus lobortis, vel lacinia ligula luctus.</p>
      <p>Aenean eleifend nibh vel lobortis efficitur. Aliquam in convallis tellus, a maximus dui. Aenean iaculis, ligula in finibus posuere, nulla est consequat mi, vel rhoncus odio velit finibus diam. Praesent tempor, justo sed varius gravida, libero quam fringilla quam, quis vehicula felis dui et libero. Aliquam in turpis in mi imperdiet gravida. Sed ante enim, ultrices non lorem volutpat, mattis bibendum sapien. Phasellus molestie augue in velit lacinia consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius in leo feugiat convallis. Pellentesque nec ultrices nunc. Nulla vitae congue orci.</p>
      <p>Praesent lacinia tortor sit amet scelerisque laoreet. Proin laoreet tempor leo sed rutrum. Sed ut ultrices leo. Aliquam elementum massa in odio ullamcorper, sed venenatis purus dictum. Quisque aliquam augue vitae ultricies tristique. Duis diam dolor, auctor non lectus quis, rutrum accumsan libero. Vestibulum id sapien velit. Phasellus dolor est, facilisis non consequat vel, fermentum vitae magna.</p>
      <p>Sed sagittis ipsum ante, et bibendum mi pellentesque vel. Vivamus molestie molestie aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce scelerisque elit non ante porta, in ullamcorper lorem efficitur. Fusce a viverra sem. Curabitur eu lectus ultricies justo ornare pellentesque vel in nulla. Praesent eu venenatis nibh, rutrum cursus nisi. Donec facilisis id magna vel tristique.</p>
      <p>Mauris risus velit, ornare a eros auctor, volutpat pretium lorem. Duis in aliquet ligula. Sed efficitur efficitur ex, eu tincidunt arcu commodo a. Maecenas commodo tortor id pretium efficitur. Morbi fermentum purus vitae congue aliquet. Mauris bibendum, velit vitae pellentesque porta, diam ante semper eros, nec euismod felis ligula id neque. Integer ex libero, convallis ac nibh at, dictum dapibus lacus. Duis congue imperdiet turpis condimentum lobortis. Curabitur vitae felis ipsum. Sed molestie euismod suscipit. Nam luctus vitae est eget tincidunt. Aenean ornare vulputate tortor vel tempor. Cras dapibus massa eu quam pellentesque, quis ultrices ante volutpat. Nullam non faucibus nulla. Nunc pharetra mi sapien, a tincidunt dui pharetra sit amet. Nam in facilisis purus, sit amet mattis quam.</p>
      <p>Donec condimentum, odio id pretium porta, urna justo ornare diam, eu finibus nibh leo pretium arcu. Etiam leo orci, malesuada ut tincidunt ut, tincidunt non libero. Nam fermentum mi sed urna finibus, in aliquet quam tincidunt. Nulla feugiat consectetur nulla quis pellentesque. Duis in sodales enim. Phasellus mollis, erat at mollis sodales, arcu lectus imperdiet lacus, id tristique ipsum orci a enim. Etiam est lectus, tristique a eleifend non, cursus vel erat. Duis ullamcorper ante ac est laoreet ornare. Sed viverra a sem quis tincidunt.</p>
      <p>Suspendisse tempus nec mauris vitae sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie accumsan mauris, nec consectetur est fermentum id. Maecenas in gravida orci. Suspendisse quis nulla vitae elit rhoncus eleifend. Nullam et sapien id mauris varius porttitor vel sit amet tortor. Integer bibendum leo eget nulla pretium fringilla. Proin turpis sapien, mattis a massa nec, malesuada scelerisque arcu. Aenean odio turpis, maximus sed nisl ac, consequat venenatis nunc.</p>
    </div>
  </div>
</template>

<script>
import VSelect from '../dist/@ckd/vue-select.umd.js'
import VFancy from './components/fancy.vue'

import VState from './components/option/state.vue'

import States from './data/states.json'
import Countries from './data/countries.json'
import Cocktails from './data/cocktails.json'

export default {
  name: 'app',
  components: { VSelect, VFancy },
  data: function(){
    return {
      states: States,
      countries: Countries,
      cocktails: Cocktails,
      state_option: VState,
      selected_custom_state: null,
      selected_native_state: null,
      selected_custom_cocktail: null,
      selected_native_cocktail: null,
      selected_custom_country: null,
      selected_native_country: null,
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 150px 0;
  font-size: 14px;
}

.wrapper {
  width: 60%;
  margin: 0 auto;
  padding: 15px;
  overflow: auto;
  max-height: 600px;
  border: 1px solid #ccc;
}

.wrapper p {
  text-align: left;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.example {
  margin-top: 2rem;
}

.example .current {
  font-size: 14px;
}

h1 {
  font-size: 20px;
}

.container {
  text-align: left;
  display: inline-block;
  min-width: 300px;
  vertical-align: top;
  margin-right: 30px;
}

.input-label {
  display: block;
  font-size: 13px;
  font-weight: bold;
}

@media only screen and (max-width: 800px) {
  #app {
    margin: 50px 0;
  }

  .wrapper {
    width: 80%;
  }
}
</style>
